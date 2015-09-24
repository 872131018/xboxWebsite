<?php
	error_reporting(-1);
	ini_set('display_errors', 'On');

	require '../common/curlConnect.php';
	require 'manageGamer.php';

	//use these for running from command line
	//this is ucantsavemenow
	//$_GET['xuid'] = '2533274815432547'; 
	//this is choseneternal
	//$_GET['xuid'] = '2533274841090548';
	//$_GET['gamertag'] = 'choseneternal';
	//$_GET['action'] = 'lookupGamertag';
	//$_GET['url'] = 'http://dlassets.xboxlive.com/public/content/ppl/colors/00000.json';

	switch($_GET['action'])
	{
		case 'lookupGamertag':
			//returns only xuid
			$url = 'https://xboxapi.com/v2/xuid/'.htmlspecialchars($_GET['gamertag']);
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->lookupGamertag($curlResponse);
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;

		case 'addGamertag':
			//returns only the official gamertag
			$url = 'https://xboxapi.com/v2/gamertag/'.htmlspecialchars($_GET['xuid']);
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->addGamertag(htmlspecialchars($_GET['gamertag']), $curlResponse);
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;

		case 'initTables':
			//returns only xuid
			$url = 'https://xboxapi.com/v2/xuid/'.$gamertag = htmlspecialchars($_GET['gamertag']);;
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->initGamerTables($curlResponse);
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;

		case 'getProfile':
			//returns a profile in json
			$url = 'https://xboxapi.com/v2/'.htmlspecialchars($_GET['xuid']).'/profile';
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->updateProfile($curlResponse, htmlspecialchars($_GET['xuid']));
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;

		case 'getGamercard':
			//returns a gamercard in json
			$url = 'https://xboxapi.com/v2/'.htmlspecialchars($_GET['xuid']).'/gamercard';
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->updateGamercard($curlResponse, htmlspecialchars($_GET['xuid']));
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;	

		case 'lookupColor':
			$curl = new curlConnect($_GET['url']);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();
			if(isset($_GET['id']))
			{
				echo 'true'.'>'.$curlResponse.'>'.$_GET['id'];
			}
			else
			{
				echo 'true'.'>'.$curlResponse;
			}
			break;

		case 'getPresence':
			//return presence as json
			$url = 'https://xboxapi.com/v2/'.htmlspecialchars($_GET['xuid']).'/presence';
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->updatePresence($curlResponse, htmlspecialchars($_GET['xuid']));
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;

		case 'getFriends':
			//return friends as json
			$url = 'https://xboxapi.com/v2/'.htmlspecialchars($_GET['xuid']).'/friends';
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->updateFriends($curlResponse, htmlspecialchars($_GET['xuid']));
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;

		case 'getRecentActivity':
			//return recent activity as json
			$url = 'https://xboxapi.com/v2/'.htmlspecialchars($_GET['xuid']).'/activity/recent';
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->updateRecentActivity($curlResponse, htmlspecialchars($_GET['xuid']));
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;

		case 'getXbox360Games':
			//return recent activity as json
			$url = 'https://xboxapi.com/v2/'.htmlspecialchars($_GET['xuid']).'/xbox360games';
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();

			$gamerManager = new manageGamer();
			$response = $gamerManager->updateXbox360Games($curlResponse, htmlspecialchars($_GET['xuid']));
			echo preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response).'>'.$curlResponse;
			break;
		case 'getAchievements':
			//return recent activity as json
			$url = 'https://xboxapi.com/v2/'.htmlspecialchars($_GET['xuid']).'/achievements/'.htmlspecialchars($_GET['titleId']);
			$curl = new curlConnect($url);
			$curlResponse =  $curl->makeRequest();
			$curl->closeConnection();
			/*
			$gamerManager = new manageGamer();
			$response = $gamerManager->updateXbox360Games($curlResponse, $xuid);
			$response = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $response);
			*/
			echo 'true'.'>'.$curlResponse;
			break;
	}
?>