function dashboardManager(actionObject, dataObject)
{
	switch(actionObject['action'])
	{
		case 'setRetrieveProfile':
			//set up click listener
			buttonManager({'action': 'setClickListener'}, {'id': 'profileButton', 
															 'function': 'retrieveProfile',
															 'xuid': dataObject['xuid']});
			$('#profileButton').val('Retrieve Profile!');
			$('#profileButton').removeClass('disabled');
			break;

		case 'setDisplayProfile':
			//set up click listener
			buttonManager({'action': 'setClickListener'}, {'id': 'profileButton', 
															 'function': 'displayProfile',
															 'profile': dataObject['profile']});
			$('#profileButton').val('Display Profile!');
			break;

		case 'setRetrieveGamercard':
			//set up click listener
			buttonManager({'action': 'setClickListener'}, {'id': 'gamercardButton', 
															 'function': 'retrieveGamercard',
															 'xuid': dataObject['xuid']});
			$('#gamercardButton').val('Retrieve Gamercard!');
			$('#gamercardButton').removeClass('disabled');
			break;

		case 'setDisplayGamercard':
			buttonManager({'action': 'setClickListener'}, {'id': 'gamercardButton', 
															 'function': 'displayGamercard',
															 'gamercard': dataObject['gamercard']});
			$('#gamercardButton').val('Display Gamercard!');
			break;

		case 'setRetrievePresence':
			buttonManager({'action': 'setClickListener'}, {'id': 'presenceButton', 
															 'function': 'retrievePresence',
															 'xuid': dataObject['xuid']});
			$('#presenceButton').val('Retrieve Presence!');
			$('#presenceButton').removeClass('disabled');
			break;

		case 'setDisplayPresence':
			buttonManager({'action': 'setClickListener'}, {'id': 'presenceButton', 
															 'function': 'displayPresence',
															 'presence': dataObject['presence']});
			$('#presenceButton').val('Display Presence!');
			break;

		case 'setRetrieveFriends':
			buttonManager({'action': 'setClickListener'}, {'id': 'friendsButton', 
															 'function': 'retrieveFriends',
															 'xuid': dataObject['xuid']});
			$('#friendsButton').val('Retrieve Friends!');
			$('#friendsButton').removeClass('disabled');
			break;

		case 'setDisplayFriends':
			buttonManager({'action': 'setClickListener'}, {'id': 'friendsButton', 
															 'function': 'displayFriends',
															 'friends': dataObject['friends']});
			$('#friendsButton').val('Display Friends!');
			break;

		case 'setRetrieveRecentActivity':
			buttonManager({'action': 'setClickListener'}, {'id': 'activityButton', 
															 'function': 'retrieveRecentActivity',
															 'xuid': dataObject['xuid']});
			$('#activityButton').val('Retrieve Activity!');
			$('#activityButton').removeClass('disabled');
			break;

		case 'setDisplayRecentActivity':
			buttonManager({'action': 'setClickListener'}, {'id': 'activityButton', 
															 'function': 'displayRecentActivity',
															 'recentActivity': dataObject['recentActivity'],
															 'xuid': dataObject['xuid']});
			$('#activityButton').val('Display Activity');
			break;

		case 'setRetrieveXbox360Games':
			buttonManager({'action': 'setClickListener'}, {'id': 'xbox360GamesButton', 
															 'function': 'retrieveXbox360Games',
															 'xuid': dataObject['xuid']});
			$('#xbox360GamesButton').val('Retrieve Xbox360 Games!');
			$('#xbox360GamesButton').removeClass('disabled');
			break;

		case 'setDisplayXbox360Games':
			buttonManager({'action': 'setClickListener'}, {'id': 'xbox360GamesButton', 
															 'function': 'displayXbox360Games',
															 'xbox360Games': dataObject['xbox360Games'],
															 'xuid': dataObject['xuid']});
			$('#xbox360GamesButton').val('Display Xbox360 Games!');
			break;
	}
}