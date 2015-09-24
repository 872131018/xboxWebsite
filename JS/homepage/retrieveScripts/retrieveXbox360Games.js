function retrieveXbox360Games(passedXUID)
{
	$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
		{
			'xuid': passedXUID,
			'action': 'getXbox360Games'
		}, 
		function(response)
		{
			//if get ok build profile table and show it
			var resultArray = response.split('>');
			var result = resultArray[0];
			var curlResponse = resultArray[1];
			console.log(resultArray);
			if(result == 'insertedXbox360Games')
			{
				$('#messageCenter').html("\
					<span>Xbox360 games have been updated!</span><br>\
					<span>Do you want to display your 360 games?</span>\
				");
				displayXbox360Games(curlResponse, passedXUID);
			}
			else
			{
				alert(result);
			}
		}
	);
}

function displayXbox360Games(passedXbox360Games, passedXUID)
{
	$('#xbox360Games').html('<div id="xbox360GamesAccordion" class="well accordion disabled, active: false">'+xbox360GamesToAccordion(passedXbox360Games)+'</div>');
	$('#xbox360GamesAccordion').accordion({'heightStyle': 'content', 'collapsible': true, 'active': false});
	$('#xbox360GamesAccordion').removeClass('disabled');
	
	var xbox360GamesObject = $.parseJSON(passedXbox360Games);
	xbox360GamesObject = xbox360GamesObject['titles'];
	for(var currentXbox360Game in xbox360GamesObject)
	{
		buttonManager(
		{
			'action': 'addClickListener'
		}, 
		{
			'id': xbox360GamesObject[currentXbox360Game]['name'].replace(/\W/g, ''),
			'function': 'retrieveAchievements',
			'game': xbox360GamesObject[currentXbox360Game],
			'xuid': passedXUID
		});
	}

	//clean up sections you don't want to display
	$('.sequenceRow').hide();
	$('.titleIdRow').hide();
	$('.titleTypeRow').hide();
	$('.platformsRow').hide();
	$('.nameRow').hide();

	//reset the striping
	$('#xbox360GamesAccordion').removeClass('table-striped');
	$('#xbox360GamesAccordion').addClass('table-striped');
}

function xbox360GamesToAccordion(passedXbox360Games)
{
	var returnAccordion = '';
	var xbox360GamesObject = $.parseJSON(passedXbox360Games);
	xbox360GamesObject = xbox360GamesObject['titles'];
	for(var currentXbox360Game in xbox360GamesObject)
	{
		returnAccordion += '<h3 id="'+xbox360GamesObject[currentXbox360Game]['name'].replace(/\W/g, '')+'">'+xbox360GamesObject[currentXbox360Game]['name']+'</h3>';
		returnAccordion += '<div>';
		returnAccordion += '<table class="table table-striped table-condensed">';
		currentXbox360Game = xbox360GamesObject[currentXbox360Game];
		for(var currentProperty in currentXbox360Game)
		{
			if(currentXbox360Game[currentProperty] == null || currentXbox360Game[currentProperty] == false)
			{
				continue;
			}

			//some of the data might be from source
			var objectProperty = currentXbox360Game[currentProperty].toString().trim();
			var isHttp = objectProperty.slice(0,4);
			if(isHttp == 'http')
			{
				returnAccordion += '<tr class='+currentProperty+'Row>\
										<td>\
											'+currentProperty+'\
										</td>\
										<td>\
											<img src='+ objectProperty+' width="280" height="300">\
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