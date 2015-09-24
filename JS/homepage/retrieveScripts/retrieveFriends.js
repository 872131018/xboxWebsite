function retrieveFriends(passedXUID)
{
	$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
		{
			'xuid': passedXUID,
			'action': 'getFriends'
		}, 
		function(response)
		{
			//if get ok build profile table and show it
			var resultArray = response.split('>');
			var result = resultArray[0];
			var curlResponse = resultArray[1];
			console.log(resultArray);
			if(result == 'insertedFriends')
			{
				$('#messageCenter').html("\
					<span>We just updated your friends list!</span><br>\
					<span>Do you want to  view your friends now?</span>\
				");

				displayFriends(curlResponse);
			}
			else
			{
				alert(result);
			}
		}
	);
}

function displayFriends(passedFriends)
{
	$('#friends').html('<div id="gamerFriendsAccordion" class="well accordion disabled, active: false">'+friendsToAccordion(passedFriends)+'</div>');
	$('#gamerFriendsAccordion').accordion({'heightStyle': 'content', 'collapsible': true, 'active': false});
	$('#gamerFriendsAccordion').removeClass('disabled');

	var friendsObject = $.parseJSON(passedFriends);
	for(var currentFriend in friendsObject)
	{
		buttonManager(
		{
			'action': 'addClickListener'
		}, 
		{
			'id': friendsObject[currentFriend]['Gamertag'].replace(/\W/g, ''),
			'function': 'displayProfile',
			'profile': currentFriend
		});
	}

	//clean up sections you don't want to display
	$('.idRow').hide();
	$('.GameDisplayNameRow').hide();
	$('.AppDisplayPicRawRow').hide();
	$('.AppDisplayNameRow').hide();

	//reset the striping
	$('#gamerFriendsAccordion').removeClass('table-striped');
	$('#gamerFriendsAccordion').addClass('table-striped');
}

function friendsToAccordion(passedFriends)
{
	var returnAccordion = '';
	var friendsObject = $.parseJSON(passedFriends);
	for(var currentFriend in friendsObject)
	{
		//get a unique identifier for an id
		returnAccordion += '<h3 id="'+friendsObject[currentFriend]['Gamertag'].replace(/\W/g, '')+'">'+friendsObject[currentFriend]['Gamertag']+'</h3>';
		returnAccordion += '<div>';
		returnAccordion += '<table class="table table-striped table-condensed">';
		var currentFriendId = friendsObject[currentFriend]['id'];
		currentFriend = friendsObject[currentFriend];
		for(var friendProperty in currentFriend)
		{
			//if current row empty skip it
			if(currentFriend[friendProperty]== null || currentFriend[friendProperty] == false)
			{
				continue;
			}
			//some of the data might be from source
			var objectProperty = currentFriend[friendProperty].toString().trim();
			var isHttp = objectProperty.slice(0,4);
			if(isHttp == 'http')
			{
				var isJson = objectProperty.slice(objectProperty.length - 4, objectProperty.length);
				if(isJson == 'json')
				{
					//set up a container to fill after ajax
					returnAccordion += '<tr class='+currentFriend+'row>\
										<td id=primaryColor'+currentFriendId+'>Primary</td>\
										<td id=secondaryColor'+currentFriendId+'>Secondary</td>\
										<td id=tertiaryColor'+currentFriendId+'>Tertiary</td>\
			               			</tr>';
				    //server will figure out the colors
					$.get('/xboxWebsite/PHP/homepage/homepageDriver.php', 
						{
							'url': objectProperty,
							'id': currentFriendId,
							'action': 'lookupColor'
						}, 
						function(response)
						{
							var resultArray = response.split('>');
							var result = resultArray[0];
							var curlResponse = resultArray[1];
							var bookmarkedId = resultArray[2];
							var colorObject = $.parseJSON(curlResponse);
							$('#primaryColor'+bookmarkedId).css('background-color', '#'+colorObject['primaryColor']);
							$('#secondaryColor'+bookmarkedId).css('background-color', '#'+colorObject['secondaryColor']);
							$('#tertiaryColor'+bookmarkedId).css('background-color', '#'+colorObject['tertiaryColor']);
						}
					);
				}
				else
				{
					returnAccordion += '<tr class='+friendProperty+'Row>\
										<td>\
											'+friendProperty+'\
										</td>\
										<td>\
											<img src='+objectProperty+' height="64" width="64">\
										</td>\
				               		</tr>';
				}
			}
			else
			{
				returnAccordion += '<tr class='+friendProperty+'Row>\
									<td>\
										'+friendProperty+'\
									</td>\
									<td>\
										'+objectProperty+'\
						            </td>\
					            </tr>';
			}
		}
		returnAccordion += '</table>';
		returnAccordion += '</div>';
	}
	return returnAccordion;
}