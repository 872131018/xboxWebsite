function addGamertagToAccount(passedXUID)
{
	$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
		{'xuid': passedXUID,
		 'action': 'addGamertag'}, 
		function(response)
		{
			var resultArray = response.split('>');
			var result = resultArray[0];
			var curlResponse = resultArray[1];
			console.log(resultArray);
			if(result == 'gamertagAdded')
			{
				$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
					{'gamertag': curlResponse,
					 'action': 'initTables'}, 
					function(response)
					{
						resultArray = response.split('>');
						result = resultArray[0];
						curlResponse = resultArray[1];
						console.log(resultArray);
						if(result == 'tablesCreated')
						{
							$('#messageCenter').html("\
								<span>Gamertag added to your account!</span><br>\
								<span>What would you like to do?</span>\
							");
							//var returnedXuid = curlResponse;
							dashboardManager({'action': 'setRetrieveProfile'}, {'xuid': curlResponse});
							dashboardManager({'action': 'setRetrieveGamercard'}, {'xuid': curlResponse});
							dashboardManager({'action': 'setRetrievePresence'}, {'xuid': curlResponse});
							dashboardManager({'action': 'setRetrieveFriends'}, {'xuid': curlResponse});
							dashboardManager({'action': 'setRetrieveRecentActivity'}, {'xuid': curlResponse});
							dashboardManager({'action': 'setRetrieveXbox360Games'}, {'xuid': curlResponse});

							$('#leftColumn').removeClass('disabled');
						}
						else
						{
							//should be a query failure
							alert(result);
						}
					}
				);
			}
			else
			{
				//error adding gamer to db
				alert(result);
			}
		}
	);
}