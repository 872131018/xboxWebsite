<?php
	class curlConnect
	{
		private $url;
		private $curl;
		function __construct($passedURL)
		{
			$this->url = $passedURL;
			$this->curl = curl_init($this->url);
			curl_setopt_array($this->curl, array
			(
    			CURLOPT_HTTPHEADER=>array('X-AUTH: 065223134e612f5ed678a606b4b97ecdab0a1f6a'),
    			CURLOPT_RETURNTRANSFER=>TRUE,
    			CURLOPT_FOLLOWLOCATION=>TRUE
    		));
		}

		public function makeRequest()
		{
			$result = curl_exec($this->curl);
			if($result === FALSE)
			{
    			return 'cURL Error: '.curl_error($this->curl);
			}
			else
			{
				return $result;
			}
		}

		public function closeConnection()
		{
			curl_close($this->curl);
		}
	}
?>