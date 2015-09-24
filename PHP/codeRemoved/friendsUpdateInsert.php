/*
$queryString = 'UPDATE gamerFriends'.$passedXUID.' SET ';
foreach($friends as $key=>$value)
{
	$queryString .= $key.'='."'".$value."', ";
}
$queryString = substr_replace($queryString, '', strrpos($queryString, ','));
$queryString .= 'WHERE xuid='."'".$passedXUID."'".'AND id='."'".$friends['id']."'";
$result = $this->connector->doQuery($queryString);
if($result === null || $result == false)
{
	$actionResult = 'queryFailed';
}
else
{
	$actionResult = 'updatedFriends';
}
*/
//if not in the database insert
/*
else
{
	$queryString = 'INSERT INTO gamerFriends'.$passedXUID.'(';
	foreach(array_keys($friends) as $key)
	{
		$queryString .= $key.', ';
	}
	$queryString = substr_replace($queryString, ')', strrpos($queryString, ','));
	$queryString .= ' VALUES (';
	foreach($friends as $key=>$value)
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
		$actionResult = 'insertedFriends';
	}
}

$recentActivity = json_decode($passedRecentActivity, true);
$recentActivity = $recentActivity[0];
$queryString = 'SELECT id FROM gamerProfile WHERE id='."'".$profile['id']."'";
$result = $this->connector->doQuery($queryString);
//if profile in database then update
if($result->num_rows > 0)
{
	$queryString = 'UPDATE gamerProfile SET ';
	foreach($profile as $key=>$value)
	{
		$queryString .= $key.'='."'".$value."', ";
	}
	$queryString = substr_replace($queryString, '', strrpos($queryString, ','));
	$queryString .= 'WHERE id='."'".$profile['id']."'";
	$result = $this->connector->doQuery($queryString);
	if($result === null || $result == false)
	{
		$actionResult = 'false';
	}
	else
	{
		$actionResult = 'true';
	}
}
//if not in the database then insert
else
{
	$queryString = 'INSERT INTO gamerProfile(';
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
	if($result === null || $result == false)
	{
		$actionResult = 'false';
	}
	else
	{
		$actionResult = 'true';
	}
}
return $actionResult;

foreach($recentActivity as $key=>$value)
{
	if(gettype($recentActivity[$key]) == 'array')
	{
		continue;
	}

}
*/