$(document).ready()
{
	//setup the fade in background
	jqueryUIWrapper({'action': 'fadeToGreen'}, {'element': '.container'});

	//one off login button
	$('#inputDiv').children().first().append('<input type="button" id="loginButton" value="Get Gamertag!" class="btn">');
	$('#loginButton').removeClass('disabled');
	
	setTimeout(function()
	{
		//set the hover events for button
		buttonManager({'action': 'setHoverListener'}, {'id': 'loginButton'});
		//set up click listener
		buttonManager({'action': 'setClickListener'}, {'id': 'loginButton', 'function': 'checkLogin'});
	}, 300);
}