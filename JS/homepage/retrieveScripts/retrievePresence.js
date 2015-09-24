function retrievePresence(passedXUID)
{
	$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
		{
			'xuid': passedXUID,
			'action': 'getPresence'
		}, 
		function(response)
		{
			//if get ok build profile table and show it
			var resultArray = response.split('>');
			var result = resultArray[0];
			var curlResponse = resultArray[1];
			console.log(resultArray);
			if(result == 'insertedPresence')
			{
				$('#messageCenter').html("\
					<span>We couldn't find your presence, so we added it!</span><br>\
					<span>Do you want to bring up your presence now?</span>\
				");

				//return the value of the presence as JSON
				//var presence = curlResponse;
				buttonManager({'action': 'setClickListener'}, {'id': 'presenceButton', 
															 'function': 'displayPresence',
															 'presence': curlResponse});
			}
			else if(result == 'updatedPresence')
			{
				$('#messageCenter').html("\
					<span>Great! Your presence was updated!</span><br>\
					<span>Do you want to bring up your presence now?</span>\
				");

				displayPresence(curlResponse);
			}
			else
			{
				alert(result);
			}
		}
	);
}

function displayPresence(passedPresence)
{
	$('#presence').html('<table class="table table-striped table-condensed">'+presenceToTable(passedPresence)+'</table>');

	//clean up sections you don't want to display
	$('.xuidrow').hide();
	$('.titleIdrow').hide();
	$('.titlePlacementrow').hide();
	$('.titleStaterow').hide();

	//reset the striping
	$('#gamerPresence').removeClass('table-striped');
	$('#gamerPresence').addClass('table-striped');
}

function presenceToTable(passedPresence)
{
	var returnTable = '';
	var presenceObject = $.parseJSON(passedPresence);
	//presence has many layers so it needs a special flattening
	presenceObject = flattenPresence(presenceObject);
	for(var currentProperty in presenceObject)
	{
		//if current row empty skip it
		if(presenceObject[currentProperty] == null || presenceObject[currentProperty] == false)
		{
			continue;
		}

		returnTable += '<tr class='+currentProperty+'row>\
								<td id='+currentProperty+'>\
									'+currentProperty+'\
								</td>\
								<td id='+presenceObject[currentProperty]+'>\
									'+presenceObject[currentProperty]+'\
					            </td>\
				            </tr>';
	}
	return returnTable;
}

function flattenPresence(passedPresence)
{
	var presenceObject = passedPresence;
	var finalArray = {};
	//top level in presence
	for(var currentProperty in passedPresence)
	{
		//devices is a special case
		if(currentProperty == 'devices')
		{
			//inside device level
			passedPresence[currentProperty] = passedPresence[currentProperty][0];
			for(var deviceProperty in passedPresence[currentProperty])
			{
				var newDeviceProperty;
				//title is special case
				if(deviceProperty == 'type')
				{

					newDeviceProperty = 'deviceType';
					finalArray[newDeviceProperty] = passedPresence[currentProperty][deviceProperty];
				}
				else if(deviceProperty == 'titles')
				{
					//inside title level
					passedPresence[currentProperty][deviceProperty] = passedPresence[currentProperty][deviceProperty][0];
					for(var titleProperty in passedPresence[currentProperty][deviceProperty])
					{
						newTitleProperty = 'title'+titleProperty.charAt(0).toUpperCase()+titleProperty.slice(1);
						finalArray[newTitleProperty] = passedPresence[currentProperty][deviceProperty][titleProperty];
					}
				}
				else
				{
					finalArray[deviceProperty] = passedPresence[currentProperty][deviceProperty];
				}
			}
		}
		else
		{
			finalArray[currentProperty] = passedPresence[currentProperty];
		}
	}
	return finalArray;
}