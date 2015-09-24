function retrieveAchievements(passedTitleId, passedXUID)
{
	$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
		{
			'titleId': passedTitleId,
			'xuid': passedXUID,
			'action': 'getAchievements'
		}, 
		function(response)
		{
			//if get ok build profile table and show it
			var resultArray = response.split('>');
			var result = resultArray[0];
			var curlResponse = resultArray[1];
			console.log(resultArray);
			if(result == 'true')
			{
				$('#messageCenter').html("\
					<span>Got the achievements lets display them!</span><br>\
				");

				//return the value of the Profile as JSON
				var achievements = curlResponse;
				displayAchievements(curlResponse);
			}
			else
			{
				alert(result);
			}
		}
	);
}

function displayAchievements(passedAchievements)
{
	$('#rightColumn').html('<div id="achievementsAccordion" class="well accordion disabled, active: false">'+achievementsToAccordion(passedAchievements)+'</div>');
	$('#rightColumn').removeClass('disabled');
	$('#achievementsAccordion').accordion({'heightStyle': 'content', 'collapsible': true, 'active': false});
	$('#achievementsAccordion').removeClass('disabled');
	/*
	var achievementsObject = $.parseJSON(passedAchievements);
	achievementsObject = achievementsObject[0];
	for(var currentAchievement in achievementsObject)
	{
		buttonManager({'action': 'setClickListener'}, {'id': xbox360GamesObject[currentXbox360Game]['name'], 
														 'function': 'retrieveAchievements',
														 'game': xbox360GamesObject[currentXbox360Game],
														 'xuid': passedXUID});

		//$('#'+xbox360GamesObject[currentXbox360Game]['name']);
	}
	*/
	
	//clean up sections you don't want to display
	$('.idRow').hide();
	$('.titleRow').hide();
	$('.titleIdRow').hide();
	$('.nameRow').hide();
	$('.flagsRow').hide();
	$('.platformRow').hide();
	$('.imageIdRow').hide();
	$('.typeRow').hide();
	$('.sequenceRow').hide();

	//reset the striping
	$('#achievementsAccordion').removeClass('table-striped');
	$('#achievementsAccordion').addClass('table-striped');
}

function achievementsToAccordion(passedAchievements)
{
	var returnAccordion = '';
	var achievementsObject = $.parseJSON(passedAchievements);
	for(var currentAchievement in achievementsObject)
	{
		achievementName = achievementsObject[currentAchievement]['name'];
		returnAccordion += '<h3 id="'+achievementName.replace(/\W/g, '')+'">'+achievementName+'</h3>';
		returnAccordion += '<div>';
		returnAccordion += '<table class="table table-striped table-condensed">';
		currentAchievement = achievementsObject[currentAchievement];
		for(var currentProperty in currentAchievement)
		{
			if(currentAchievement[currentProperty] == null || currentAchievement[currentProperty] == false)
			{
				continue;
			}

			//some of the data might be from source
			var objectProperty = currentAchievement[currentProperty].toString().trim();
			var isHttp = objectProperty.slice(0,4);
			if(isHttp == 'http')
			{
				returnAccordion += '<tr class='+currentProperty+'Row>\
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
				returnAccordion += '<tr class='+currentProperty+'Row>\
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