<?php
	require 'connector.php';

	$username = $_POST['username'];
	$password = $_POST['password'];

	//create a connection to the server
	$connector = new connector('127.0.0.1', 'root', 'root', 'Xbox');
	if(isset($connector))
	{
		$connector -> createConnection();
	}
	else
	{
		die('Error creating connector!'."\n");
	}

	//determine if the user is registered
	$queryString = 'SELECT id, username, password FROM registeredUsers WHERE username='."'".$_POST['username']."'";
	$result = $connector -> doQuery($queryString);
	$result = $result -> fetch_assoc();
	if($result['password'] == $password) 
	{
    	echo file_get_contents('../HTML/homepage.html');
	} 
	else 
	{
    	echo file_get_contents('../HTML/loginFailed.html');
	}
	$connector -> closeConnection();
?>