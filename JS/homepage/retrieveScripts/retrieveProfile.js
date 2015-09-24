function retrieveProfile(passedXUID)
{
	$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
		{
			'xuid': passedXUID,
			'action': 'getProfile'
		}, 
		function(response)
		{
			//if get ok build profile table and show it
			var resultArray = response.split('>');
			var result = resultArray[0];
			var curlResponse = resultArray[1];
			console.log(resultArray);
			if(result == 'insertedProfile')
			{
				$('#messageCenter').html("\
					<span>We couldn't find that gamertag, so we added it!</span><br>\
					<span>Do you want to bring up your profile now?</span>\
				");
				
				//return the value of the Profile as JSON
				//var profile = curlResponse;
				dashboardManager({'action': 'setDisplayProfile'}, {'profile': curlResponse});
			}
			else if(result == 'updatedProfile')
			{
				$('#messageCenter').html("\
					<span>Great! Your profile has been updated!</span><br>\
					<span>Do you want to bring up your profile now?</span>\
				");
				displayProfile(curlResponse);
			}
			else
			{
				alert(result);
			}
		}
	);
}

function displayProfile(passedProfile)
{
	$('#profile').html('<table class="table table-striped table-condensed">'+profileToHTML(passedProfile)+'</table>');

	//clean up sections you don't want to display
	$('.idRow').hide();
	$('.GameDisplayNameRow').hide();
	$('.AppDisplayNameRow').hide();
	$('.AppDisplayPicRawRow').hide();

	//reset the striping
	$('#gamerProfile').removeClass('table-striped');
	$('#gamerProfile').addClass('table-striped');
}

function profileToHTML(passedProfile)
{
	var returnTable = '';
	var profileObject = $.parseJSON(passedProfile);
	for(var currentProperty in profileObject)
	{
		//if current Row empty skip it
		if(profileObject[currentProperty] == null || profileObject[currentProperty] == false)
		{
			continue;
		}

		//some of the data might be from source
		var objectProperty = profileObject[currentProperty].toString().trim();
		var isHttp = objectProperty.slice(0,4);
		if(isHttp == 'http')
		{
			var isJson = objectProperty.slice(objectProperty.length - 4, objectProperty.length);
			if(isJson == 'json')
			{
				//set up a container to fill after ajax
				returnTable += '<tr class='+currentProperty+'Row>\
									<td id=primaryColor>Primary</td>\
									<td id=secondaryColor>Secondary</td>\
									<td id=tertiaryColor>Tertiary</td>\
		               			</tr>';
			    //server will figure out the colors
				$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
					{
						'url': objectProperty,
						'action': 'lookupColor'
					}, 
					function(response)
					{
						var resultArray = response.split('>');
						var result = resultArray[0];
						var curlResponse = resultArray[1];
						var colorObject = $.parseJSON(curlResponse);
						$('#primaryColor').css('background-color', '#'+colorObject['primaryColor']);
						$('#secondaryColor').css('background-color', '#'+colorObject['secondaryColor']);
						$('#tertiaryColor').css('background-color', '#'+colorObject['tertiaryColor']);
					}
				);
			}
			else
			{
				returnTable += '<tr class='+currentProperty+'Row>\
									<td id='+currentProperty+'>\
										'+currentProperty+'\
									</td>\
									<td id='+profileObject[currentProperty]+'>\
										<img src='+profileObject[currentProperty]+'>\
									</td>\
			               		</tr>';
			}
		}
		else
		{
			returnTable += '<tr class='+currentProperty+'Row>\
								<td id='+currentProperty+'>\
									'+currentProperty+'\
								</td>\
								<td id='+profileObject[currentProperty]+'>\
									'+profileObject[currentProperty]+'\
					            </td>\
				            </tr>';
		}
	}
	return returnTable;
}