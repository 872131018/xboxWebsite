function retrieveGamercard(passedXUID)
{
	$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
		{
			'xuid': passedXUID,
			'action': 'getGamercard'
		}, 
		function(response)
		{
			//if get ok build profile table and show it
			var resultArray = response.split('>');
			var result = resultArray[0];
			var curlResponse = resultArray[1];
			console.log(resultArray);
			if(result == 'insertedGamercard')
			{
				$('#messageCenter').html("\
					<span>We couldn't find your gamercard, so we added it!</span><br>\
					<span>Do you want to display your gamercard now?</span>\
				");

				//return the value of the gamercard as JSON
				//var returnedGamercard = curlResponse;
				buttonManager({'action': 'setClickListener'}, {'id': 'gamercardButton', 
															 'function': 'displayGamercard',
															 'gamercard': curlResponse});
			}
			else if(result == 'updatedGamercard')
			{
				$('#messageCenter').html("\
					<span>Great! Your gamercard has been updated!</span><br>\
					<span>Do you want to display your gamercard now?</span>\
				");
				displayGamercard(curlResponse);
			}
			else
			{
				alert(result);
			}
		}
	);
}

function displayGamercard(passedGamercard)
{
	$('#gamercard').html('<table class="table table-striped table-condensed">'+gamercardToTable(passedGamercard)+'</table>');

	//clean up sections you don't want to display
	$('.gamerpicSmallImagePathrow').hide();
	$('.gamerpicLargeImagePathrow').hide();
	$('.gamerpicSmallSslImagePathrow').hide();
	$('.gamerpicLargeSslImagePathrow').hide();
	$('.avatarManifestrow').hide();

	//reset the striping
	$('#gamercard').removeClass('table-striped');
	$('#gamercard').addClass('table-striped');
}

function gamercardToTable(passedGamercard)
{
	var returnTable = '';
	var gamercardObject = $.parseJSON(passedGamercard);
	for(currentProperty in gamercardObject)
	{
		//if current row empty skip it
		if(gamercardObject[currentProperty] == null || gamercardObject[currentProperty] == false)
		{
			continue;
		}

		//some of the data might be from source
		var objectProperty = gamercardObject[currentProperty].toString();
		var isHttp = objectProperty.slice(0,4);
		if(isHttp == 'http')
		{
			var isJson = objectProperty.slice(objectProperty.length - 4, objectProperty.length);
			if(isJson == 'json')
			{
				//set up a container to fill after ajax
				returnTable += '<tr class='+currentProperty+'row>\
									<td id=primaryColor>Primary</td>\
									<td id=secondaryColor>Secondary</td>\
									<td id=tertiaryColor>Tertiary</td>\
		               			</tr>';
			    //server will figure out the colors
				$.get('xboxWebsite/PHP/homepage/homepageDriver.php', 
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
				returnTable += '<tr class='+currentProperty+'row>\
									<td id='+currentProperty+'>\
										'+currentProperty+'\
									</td>\
									<td id='+gamercardObject[currentProperty]+'>\
										<img src='+gamercardObject[currentProperty]+' width="64" height="64">\
									</td>\
			               		</tr>';
			}
		}
		else
		{
			returnTable += '<tr class='+currentProperty+'row>\
								<td id='+currentProperty+'>\
									'+currentProperty+'\
								</td>\
								<td id='+gamercardObject[currentProperty]+'>\
									'+gamercardObject[currentProperty]+'\
					            </td>\
				            </tr>';
		}
	}
	return returnTable;
}