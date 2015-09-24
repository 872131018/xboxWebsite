<?php
	error_reporting(-1);
	ini_set('display_errors', 'On');

	require_once('connector.php');
	$connector = new connector('127.0.0.1', 'root', 'root', 'Xbox');
	if(isset($connector))
	{
		$connector->createConnection();
	}
	else
	{
		die('Error creating connector!');
	}

	//delete each game specific table
	$queryString = 'SHOW TABLES LIKE %{Table}%';
	$result = $connector->doQuery($queryString);
	if(gettype($result) == 'object' && $result->num_rows > 0)
	{
		$result = $result->fetch_all();
		foreach($result as $key)
		{
			$result = $key[0];
			$queryString = 'DROP TABLE '.$result;
			$dropResult = $connector->doQuery($queryString);
			if($dropResult == true)
			{
				$resultMessage = 'Success';
			}
			else
			{
				$resultMessage = 'Failure on'.$result;
				echo $resultMessage;
				exit;
			}
		}
		$queryString = 'DELETE FROM validGamertags';
		$connector->doQuery($queryString);
		echo $resultMessage;
	}
	else
	{
		echo $result;
	}

?>