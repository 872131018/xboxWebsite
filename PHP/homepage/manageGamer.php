<?php
	require '../common/connector.php';
	require '../common/helperClass.php';
	class manageGamer
	{
		private $connector;
		function __construct()
		{
			//create a connection to the server
			$this->connector = new connector('127.0.0.1', 'root', 'root', 'Xbox');
			if(isset($this->connector))
			{
				$this->connector->createConnection();
			}
			else
			{
				die('Error creating connector!');
			}
		}

		function __destruct()
		{
			$this->connector->closeConnection();
		}

		public function lookupGamertag($passedXUID)
		{
			$queryString = 'SELECT xuid, gamertag FROM validGamertags WHERE xuid='."'".$passedXUID."'";
			$result = $this->connector->doQuery($queryString);
			//returns object if something is found
			if(gettype($result) == 'object')
			{
				if($result->num_rows > 0)
				{
					$actionResult = 'foundGamertag';
				}
				else
				{
					$actionResult = 'noGamertag';
				}
			}
			else
			{
				$actionResult = 'queryFailed';
			}
			return $actionResult;
		}

		public function addGamertag($passedXUID, $passedGamertag)
		{
			$queryString = 'INSERT INTO validGamertags(xuid, gamertag) VALUES ';
			$queryString .= '('.'"'.$passedXUID.'"'.', '.'"'.$passedGamertag.'"'.')';
			$result = $this->connector->doQuery($queryString);
			if($result == true)
			{
				$actionResult = 'gamertagAdded';
			}
			else
			{
				$actionResult = 'queryFailed';
			}
			return $actionResult;
		}

		public function initGamerTables($passedGamerXUID)
		{
			//holds all the queries
			$queryStringArray = [];
			//do gamer profile
			$queryString = file_get_contents('../../MySQL/create/createProfileTable.sql');
			$queryString = str_replace('Xbox.profile', 'Xbox.profile'.$passedGamerXUID, $queryString);
			array_push($queryStringArray, $queryString);
			//do gamer card
			$queryString = file_get_contents('../../MySQL/create/createGamercardTable.sql');
			$queryString = str_replace('Xbox.gamercard', 'Xbox.gamercard'.$passedGamerXUID, $queryString);
			array_push($queryStringArray, $queryString);
			//do gamer presence
			$queryString = file_get_contents('../../MySQL/create/createPresenceTable.sql');
			$queryString = str_replace('Xbox.presence', 'Xbox.presence'.$passedGamerXUID, $queryString);
			array_push($queryStringArray, $queryString);
			//do gamer friends
			$queryString = file_get_contents('../../MySQL/create/createFriendsTable.sql');
			$queryString = str_replace('Xbox.friends', 'Xbox.friends'.$passedGamerXUID, $queryString);
			array_push($queryStringArray, $queryString);
			//do gamer recent activity
			$queryString = file_get_contents('../../MySQL/create/createRecentActivityTable.sql');
			$queryString = str_replace('Xbox.recentActivity', 'Xbox.recentActivity'.$passedGamerXUID, $queryString);
			array_push($queryStringArray, $queryString);
			//do gamer xbox360 games
			$queryString = file_get_contents('../../MySQL/create/createXbox360GamesTable.sql');
			$queryString = str_replace('Xbox.xbox360Games', 'Xbox.xbox360Games'.$passedGamerXUID, $queryString);
			array_push($queryStringArray, $queryString);
			//perform all the creation queries
			foreach($queryStringArray as $currentQuery)
			{
				$result = $this->connector->doQuery($currentQuery);
				if($result == true)
				{
					$actionResult = 'tablesCreated';
				}
				else
				{
					$actionResult = 'queryFailed';
					break;
				}
			}
			return $actionResult;
		}

		public function updateProfile($passedProfile, $passedXUID)
		{
			$profile = json_decode($passedProfile, true);
			$queryString = 'SELECT id FROM profile'.$passedXUID.' WHERE id='."'".$profile['id']."'";
			$result = $this->connector->doQuery($queryString);
			//check for successful query
			if(gettype($result) == 'object')
			{
				//any results then update them
				if($result->num_rows > 0)
				{
					$queryString = 'UPDATE profile'.$passedXUID.' SET ';
					foreach($profile as $key=>$value)
					{
						$queryString .= $key.'='."'".$value."', ";
					}
					$queryString = substr_replace($queryString, '', strrpos($queryString, ','));
					$queryString .= 'WHERE id='."'".$profile['id']."'";
					$result = $this->connector->doQuery($queryString);
					if($result == true)
					{
						$actionResult = 'updatedProfile';
					}
					else
					{
						$actionResult = 'failedQuery';
					}
				}
				//if not in the database then insert
				else
				{
					$queryString = 'INSERT INTO profile'.$passedXUID.'(';
					foreach(array_keys($profile) as $key)
					{
						$queryString .= $key.', ';
					}
					$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
					$queryString .= ' VALUES (';
					foreach($profile as $key=>$value)
					{ 
						if($value == '' || $value == null)
						{
							$value = 'false';
						}
						$queryString .= "'".$value."'".', ';
					}
					$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
					$result = $this->connector->doQuery($queryString);
					if($result == true)
					{
						$actionResult = 'insertedProfile';
					}
					else
					{
						$actionResult = 'failedQuery';
					}
				}
			}
			else
			{
				$actionResult = 'failedQuery';
			}
			return $actionResult;
		}

		public function updateGamercard($passedGamertag, $passedXUID)
		{
			//get associative array from passed json
			$gamertag = json_decode($passedGamertag, true);
			$queryString = 'SELECT gamertag FROM gamercard'.$passedXUID.' WHERE gamertag='."'".$gamertag['gamertag']."'";
			$result = $this->connector->doQuery($queryString);
			//check for successful query
			if(gettype($result) == 'object')
			{
				//if profile in database update
				if($result->num_rows > 0)
				{
					$queryString = 'UPDATE gamercard'.$passedXUID.' SET ';
					foreach($gamertag as $key=>$value)
					{
						$queryString .= $key.'='."'".$value."', ";
					}
					$queryString = substr_replace($queryString, '', strrpos($queryString, ','));
					$queryString .= 'WHERE gamertag='."'".$gamertag['gamertag']."'";
					$result = $this->connector->doQuery($queryString);
					if($result === null || $result == false)
					{
						$actionResult = 'queryFailed';
					}
					else
					{
						$actionResult = 'updatedGamercard';
					}
				}
				//if not in the database insert
				else
				{
					$queryString = 'INSERT INTO gamercard'.$passedXUID.'(';
					foreach(array_keys($gamertag) as $key)
					{
						$queryString .= $key.', ';
					}
					$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
					$queryString .= ' VALUES (';
					foreach($gamertag as $key=>$value)
					{ 
						if($value == '' || $value == null)
						{
							$value = 'false';
						}
						$queryString .= "'".$value."'".', ';
					}
					$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
					$result = $this->connector->doQuery($queryString);
					if($result === null || $result == false)
					{
						$actionResult = 'queryFailed';
					}
					else
					{
						$actionResult = 'insertedGamercard';
					}
				}
			}
			else
			{
				$actionResult = 'failedQuery';
			}
			return $actionResult;
		}

		public function updatePresence($passedPresence, $passedXUID)
		{
			$presence = json_decode($passedPresence, true);
			//this flattens the passed json
			$helper = new helperClass();
			$presence = $helper->flattenPresence($presence);
			$queryString = 'SELECT xuid FROM presence'.$passedXUID.' WHERE xuid='."'".$presence['xuid']."'";
			$result = $this->connector->doQuery($queryString);
			//check for successful query
			if(gettype($result) == 'object')
			{
				//if profile in database update
				if($result->num_rows > 0)
				{
					$queryString = 'UPDATE presence'.$passedXUID.' SET ';
					foreach($presence as $key=>$value)
					{
						$queryString .= $key.'='."'".$value."', ";
					}
					$queryString = substr_replace($queryString, '', strrpos($queryString, ','));
					$queryString .= 'WHERE xuid='."'".$presence['xuid']."'";
					$result = $this->connector->doQuery($queryString);
					if($result === null || $result == false)
					{
						$actionResult = 'queryFailed';
					}
					else
					{
						$actionResult = 'updatedPresence';
					}
				}
				//if not in the database insert
				else
				{
					$queryString = 'INSERT INTO presence'.$passedXUID.'(';
					foreach(array_keys($presence) as $key)
					{
						$queryString .= $key.', ';
					}
					$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
					$queryString .= ' VALUES (';
					foreach($presence as $key=>$value)
					{ 
						if($value == '' || $value == null)
						{
							$value = 'false';
						}
						$queryString .= "'".$value."'".', ';
					}
					$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
					$result = $this->connector->doQuery($queryString);
					if($result === null || $result == false)
					{
						$actionResult = 'queryFailed';
					}
					else
					{
						$actionResult = 'insertedPresence';
					}
				}
			}
			else
			{
				$actionResult = 'failedQuery';
			}
			return $actionResult;
		}

		public function updateFriends($passedFriends, $passedXUID)
		{
			$friends = json_decode($passedFriends, true);
			$queryString = 'SHOW TABLES LIKE '.'"'.'friends'.$passedXUID.'"';
			$result = $this->connector->doQuery($queryString);
			//ensure that table exists before updating
			if(gettype($result) == 'object')
			{
				$queryString = 'DELETE FROM friends'.$passedXUID;
				$result = $this->connector->doQuery($queryString);
				//delete old data, upload new data
				if($result == true)
				{
					//key will be friend index value is json of friend
					foreach($friends as $currentFriendKey=>$currentFriendValue)
					{
						$queryString = 'INSERT INTO friends'.$passedXUID.'(';
						foreach(array_keys($currentFriendValue) as $friendKey)
						{
							$queryString .= $friendKey.', ';
						}
						$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
						$queryString .= ' VALUES (';
						foreach($currentFriendValue as $key=>$value)
						{ 
							if($value == '' || $value == null)
							{
								$value = 'false';
							}
							$queryString .= "'".$value."'".', ';
						}
						$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
						$result = $this->connector->doQuery($queryString);
						if($result == true)
						{
							$actionResult = 'insertedFriends';
						}
						else
						{
							$actionResult = 'queryFailed';
						}
					}
				}
				else
				{
					$actionResult = 'queryFailed';
				}
			}
			else
			{
				$actionResult = 'queryFailed';
			}
			return $actionResult;
		}

		public function updateRecentActivity($passedRecentActivity, $passedXUID)
		{
			$recentActivity = json_decode($passedRecentActivity, true);
			$queryString = 'SHOW TABLES LIKE '.'"'.'recentActivity'.$passedXUID.'"';
			$result = $this->connector->doQuery($queryString);
			//ensure that table exists before updating
			if(gettype($result) == 'object')
			{
				$queryString = 'DELETE FROM recentActivity'.$passedXUID;
				$result = $this->connector->doQuery($queryString);
				//delete old data, upload new data
				if($result == true)
				{
					//key will be friend index value is json of friend
					$recentActivity = $recentActivity[0];
					foreach($recentActivity as $recentActivityKey=>$recentActivityValue)
					{
						$queryString = 'INSERT INTO recentActivity'.$passedXUID.'(';
						foreach(array_keys($recentActivity) as $activityKey)
						{
							if($activityKey == 'activity' || $activityKey == 'authorInfo')
							{
								continue;
							}
							if($activityKey == '' || $activityKey == null)
							{
								$activityValue = 'false';
							}
							$queryString .= $activityKey.', ';
						}
						$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
						$queryString .= ' VALUES (';
						foreach(array_keys($recentActivity) as $activityKey)
						{ 
							if($activityKey == 'activity' || $activityKey == 'authorInfo')
							{
								continue;
							}
							if($activityKey == '' || $activityKey == null)
							{
								$activityValue = 'false';
							}
							$queryString .= "'".$recentActivity[$activityKey]."'".', ';
						}
						$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
						//echo $queryString; die;
						$result = $this->connector->doQuery($queryString);
						if($result == true)
						{
							$actionResult = 'insertedRecentActivity';
						}
						else
						{
							$actionResult = 'queryFailed';
						}
					}
				}
				else
				{
					$actionResult = 'queryFailed';
				}
			}
			else
			{
				$actionResult = 'queryFailed';
			}
			return $actionResult;
		}

		public function updateXbox360Games($passedXbox360Games, $passedXUID)
		{
			$xbox360Games = json_decode($passedXbox360Games, true);
			$queryString = 'SHOW TABLES LIKE '.'"'.'xbox360Games'.$passedXUID.'"';
			$result = $this->connector->doQuery($queryString);
			//ensure that table exists before updating
			if(gettype($result) == 'object')
			{
				$queryString = 'DELETE FROM xbox360Games'.$passedXUID;
				$result = $this->connector->doQuery($queryString);
				//delete old data, upload new data
				if($result == true)
				{
					$xbox360Games = $xbox360Games['titles'];
					foreach($xbox360Games as $xbox360GameKey=>$xbox360GameValue)
					{
						$currentGame = $xbox360Games[$xbox360GameKey];
						$queryString = 'INSERT INTO xbox360Games'.$passedXUID.'(';
						foreach(array_keys($currentGame) as $currentGameKey)
						{
							if($currentGameKey == 'platforms')
							{
								continue;
							}
							$queryString .= $currentGameKey.', ';
						}
						$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
						$queryString .= ' VALUES (';
						foreach($currentGame as $currentGameKey=>$currentGameValue)
						{ 
							if($currentGameKey == 'platforms')
							{
								continue;
							}
							if($currentGameKey  == '' || $currentGameKey  == null)
							{
								$currentGameValue = 'false';
							}
							$queryString .= "'".$currentGameValue."'".', ';
						}
						$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
						$result = $this->connector->doQuery($queryString);
						if($result == true)
						{
							$actionResult = 'insertedXbox360Games';
						}
						else
						{
							$actionResult = 'queryFailed';
						}
					}
				}
				else
				{
					$actionResult = 'queryFailed';
				}
			}
			else
			{
				$actionResult = 'queryFailed';
			}
			return $actionResult;
		}
	}//end class definition
?>