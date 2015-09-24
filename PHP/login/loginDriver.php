<?php
	require '../common/connector.php';
	//create a connection to the server
	//$connector = new connector('127.0.0.1', 'root', '', 'Xbox');
	//use this for mac 
	$connector = new connector('127.0.0.1', 'root', 'root', 'Xbox');
	if(isset($connector))
	{
		$connector -> createConnection();
	}
	else
	{
		die('Error creating connector!'."\n");
	}
	//use for command line
	//$_POST['action'] = 'login';
	//$_POST['username'] = 'john';
	//$_POST['password'] = 'john';

	switch($_POST['action'])
	{
		//check what function to do
		case 'login':
			//determine if the user is registered
			$queryString = 'SELECT username, password ';
			$queryString .= 'FROM registeredUsers WHERE username=';
			$queryString .= '"'.$_POST['username'].'"';
			$result = $connector -> doQuery($queryString);
			if($result->num_rows > 0)
			{
				$result = $result -> fetch_assoc();
				if($result['username'] == $_POST['username'] && $result['password'] == $_POST['password']) 
				{
					$result = 'loginSuccess';
					echo $result;
				} 
				else 
				{
					$result = 'loginFailure';
					echo $result;
				}
			}
			else
			{
				//user not in database must register them
				$result = 'noResults';
				echo $result;
			}
			break;

		case 'addUser':
			$queryString = 'INSERT INTO registeredUsers (username, password) ';
			$queryString .= 'VALUES ('.'"'.$_POST['username'].'"'.', '.'"'.$_POST['password'].'"'.')';
			$result = $connector -> doQuery($queryString);
			if($result != 'true')
			{
				$result = 'false';
				echo $result;
			}
			else
			{
				$result = 'true';
				echo $result;
			}
			break;
		case 'loadHomepage':
			echo file_get_contents('../HTML/homepage.html');
			break;
	}
	$connector -> closeConnection();
?>