<?php
	class helperClass
	{
		/*
		public function flattenArray($passedArray, $returnArray)
		{
			foreach ($passedArray as $key=>$value)
			{
				if(gettype($value) == 'array')
				{
					$returnArray = array_merge($this->flattenArray($value, $returnArray), $returnArray);
				}
				else
				{
					$returnArray[$key] = $value;
				}
			}
			//$returnArray = $passedPresence;
			return $returnArray;
		}
		*/

		public function flattenPresence($passedPresence)
		{
			$flatPresence = array();
			foreach($passedPresence as $key=>$value)
			{
				if($key == 'devices')
				{
					$devices = $value[0];
					foreach($devices as $deviceKey=>$deviceValue)
					{
						if($deviceKey == 'type')
						{
							$deviceKey = 'deviceType';
						}
						else if($deviceKey == 'titles')
						{
							$titles = $deviceValue[0];
							foreach($titles as $titleKey=>$titleValue)
							{
								if($titleKey == 'id')
								{
									$titleKey = 'titleId';
								}
								else if($titleKey == 'state')
								{
									$titleKey = 'stateOfApp';
								}
								$flatPresence[$titleKey] = $titleValue;
							}
						}
						else
						{
							$flatPresence[$deviceKey] = $deviceValue;
						}
					}
				}
				else
				{
					$flatPresence[$key] = $value;
				}
			}
			return $flatPresence;
		}
	}//end class definition
?>