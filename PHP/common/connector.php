<?php
	class connector
	{
		private $server;
		private $username;
		private $password;
		private $database;
		private $connection;

		function __construct($serverParameter, $usernameParameter, $passwordParameter, $databaseParameter)
		{
			$this->server = $serverParameter;
			$this->username = $usernameParameter;
			$this->password = $passwordParameter;
			$this->database = $databaseParameter;
		}
		public function createConnection()
		{
			$this->connection = new mysqli($this->server, 
											$this->username, 
											$this->password, 
											$this->database);
			if($this->connection->connect_error)
			{
			    die("Connection failed! ".$connection->connect_error)."\n";
			}
			else
			{
				return "Connected successfully!"."\n";
			}
		}

		public function doQuery($queryString)
		{
			$result = $this->connection->query($queryString);
			return $result;
		}

		public function closeConnection()
		{
			$this->connection->close();
			return 'Closed Connection!'."\n";
		}
	}//end class definition
?>