function checkLogin()
{
	$.post('/xboxWebsite/PHP/login/loginDriver.php', {'action': 'login',
													  'username': $('#username').val(),
													  'password': $('#password').val()}, 
		function(response)
		{
			switch(response)
			{
				case 'loginSuccess':
					window.location = '/xboxWebsite/HTML/homepage.html';
					//this block loads page from server
					/*
					$.post('../PHP/loginDriver.php', {action: 'loadHomepage'},
						function(response)
						{
							document.open("text/html", true);
							document.write(response);
							document.close();
						});
					*/
					break;
				case 'loginFailure':
					$('#messageCenter').html('Wrong Username or Password!');
					break;
				case 'noResults':
					$('#messageCenter').html('That user can not be found!');
					//replace button on page
					buttonManager({'action': 'replaceButton'}, {'idToRemove': 'loginButton', 
																'idToAdd': 'addUserButton', 
																'newValue': 'Sign Me Up!'});
					//set the hover events for button
					buttonManager({'action': 'setHoverListener'}, {'id': 'addUserButton'});
					//set up click listener
					buttonManager({'action': 'setClickListener'}, {'id': 'addUserButton', 'function': 'addUser'});
					break;
			}
		});
}

function addUser()
{
	$.post('/xboxWebsite/PHP/login/loginDriver.php', {'action': 'addUser',
										 	'username': $('#username').val(),
										  	'password': $('#password').val()}, 
		function(response)
		{
			if(response == 'true')
			{
				$('#messageCenter').html('You have been added to the database!');
				buttonManager({'action': 'replaceButton'}, {'idToRemove': 'addUserButton', 
															'idToAdd': 'loginButton', 
															'newValue': 'Sign In!'});
				//set up click listener
				buttonManager({'action': 'setClickListener'}, {'id': 'loginButton', 'function': 'checkLogin'});
			}
		});
}