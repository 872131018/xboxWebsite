function retrieveRecentActivity(passedXUID)
{
	$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
		{
			'xuid': passedXUID,
			'action': 'getRecentActivity'
		}, 
		function(response)
		{
			//if get ok build profile table and show it
			var resultArray = response.split('>');
			var result = resultArray[0];
			var curlResponse = resultArray[1];
			console.log(resultArray);
			if(result == 'insertedRecentActivity')
			{
				$('#messageCenter').html("\
					<span>Recent Activity has been updated!</span><br>\
					<span>Do you want to display your activity?</span>\
				");
				displayRecentActivity(curlResponse, passedXUID);
			}
			else
			{
				alert(result);
			}
		}
	);
}

function displayRecentActivity(passedRecentActivity, passedXUID)
{
	$('#recentActivity').html('<div id="gamerRecentActivityAccordion" class="well accordion disabled, active: false">'+recentActivityToAccordion(passedRecentActivity)+'</div>');
	$('#gamerRecentActivityAccordion').accordion({'heightStyle': 'content', 'collapsible': true, 'active': false});
	$('#gamerRecentActivityAccordion').removeClass('disabled');

	var recentActivityObject = $.parseJSON(passedRecentActivity);
	for(var currentActivity in recentActivityObject)
	{
		buttonManager(
		{
			'action': 'addClickListener'
		}, 
		{
			'id': recentActivityObject[currentActivity]['contentTitle'].replace(/\W/g, ''),
			'function': 'retrieveAchievements',
			'recentActivity': recentActivityObject[currentActivity],
			'xuid': passedXUID
		});
	}

	//clean up sections you don't want to display
	$('.startTimerow').hide();
	$('.sessionDurationInMinutesrow').hide();
	$('.contentImageUrirow').hide();
	$('.bingIdrow').hide();
	$('.vuiDisplayNamerow').hide();
	$('.titleIdrow').hide();
	$('.activityItemTyperow').hide();
	$('.contentTyperow').hide();
	$('.shortDescriptionrow').hide();
	$('.itemTextrow').hide();
	$('.shareRootrow').hide();
	$('.feedItemIdrow').hide();
	$('.itemRootrow').hide();
	$('.gamertagrow').hide();
	$('.displayNamerow').hide();
	$('.userImageUrirow').hide();
	$('.userXuidrow').hide();
	$('.endTimerow').hide();

	//reset the striping
	$('#gamerRecentActivityAccordion').removeClass('table-striped');
	$('#gamerRecentActivityAccordion').addClass('table-striped');
}

function recentActivityToAccordion(passedRecentActivity)
{
	var returnAccordion = '';
	var recentActivityObject = $.parseJSON(passedRecentActivity);
	for(var currentActivity in recentActivityObject)
	{
		returnAccordion += '<h3 id="'+recentActivityObject[currentActivity]['contentTitle'].replace(/\W/g, '')+'">'+recentActivityObject[currentActivity]['contentTitle']+'</h3>';
		returnAccordion += '<div>';
		returnAccordion += '<table class="table table-striped table-condensed">';
		currentActivity = recentActivityObject[currentActivity];
		for(var currentProperty in currentActivity)
		{
			//if current row empty skip it
			if(currentActivity[currentProperty] == null || currentActivity[currentProperty] == false ||
			   currentProperty == 'activity' || currentProperty == 'authorInfo')
			{
				continue;
			}

			//some of the data might be from source
			var objectProperty = currentActivity[currentProperty].toString().trim();
			var isHttp = objectProperty.slice(0,4);
			if(isHttp == 'http')
			{
				returnAccordion += '<tr class='+currentProperty+'row>\
									<td>\
										'+currentProperty+'\
									</td>\
									<td>\
										<img src='+ objectProperty+' width="64" height="64">\
									</td>\
			               		</tr>';
			}
			else
			{
				returnAccordion += '<tr class='+currentProperty+'row>\
									<td>\
										'+currentProperty+'\
									</td>\
									<td>\
										'+ objectProperty+'\
						            </td>\
					            </tr>';
			}
		}
		returnAccordion += '</table>';
		returnAccordion += '</div>';
	}
	return returnAccordion;
}