$(document).ready()
{
	//set up the fade in background
	jqueryUIWrapper({'action': 'fadeToGreen'}, {'element': '.container'});

	//one off login button
	$('#inputDiv').children().first().append('<input type="button" id="loginButton" value="Get Gamertag!" class="btn">');
	$('#loginButton').removeClass('disabled');

	//define the accordion in id: value pairs
	var gamerAccordion = 
	{
		'profile': 'Profile',
		'gamercard': 'Gamercard',
		'presence': 'Presence',
		'friends': 'Friends',
		'recentActivity': 'Recent Activity',
		'xbox360Games': 'Xbox 360 Games'
	}
	//gives scripts a chance to load
	setTimeout(function()
	{
		//setup the buttons
		buttonManager({'action': 'init'}, gamerAccordion);
		//set the hover events for button
		buttonManager({'action': 'setHoverListener'}, {'id': 'loginButton'});
		//set up click listener
		buttonManager({'action': 'setClickListener'}, {'id': 'loginButton', 'function': 'checkGamertag'});
	}, 500);
}