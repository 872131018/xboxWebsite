function buttonManager(actionObject, dataObject)
{
	switch(actionObject['action'])
	{
		case 'init':
			for(currentTab in dataObject)
			{
				accordionTab = '<h3>'+dataObject[currentTab]+'</h3>';
				accordionTab += '<div id='+currentTab+'></div>';
				$('#leftColumn').append(accordionTab);
			}
			//set the accordian containers
			$('.accordion').accordion({'heightStyle': 'content', 'collapsible': true, active: false});
			break;
		case 'setHoverListener':
			//set hover listener for element in dataObject
			$('#'+dataObject['id']).on('mouseenter', function()
			{
				$('#'+dataObject['id']).addClass('hover');
			});
			$('#'+dataObject['id']).on('mouseleave', function()
			{
				$('#'+dataObject['id']).removeClass('hover');
			});
			break;
		case 'setClickListener':
			//reset the listener for accordion
			$('#'+dataObject['id']).off('click');
			//set up click listener with method in dataObject
			$('#'+dataObject['id']).on('click', function()
			{
				if(typeof dataObject['profile'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['profile']);
				}
				else if(typeof dataObject['gamercard'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['gamercard']);
				}
				else if(typeof dataObject['presence'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['presence']);
				}
				else if(typeof dataObject['friends'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['friends']);
				}
				else if(typeof dataObject['recentActivity'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['recentActivity'], dataObject['xuid']);
				}
				else if(typeof dataObject['xbox360Games'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['xbox360Games'], dataObject['xuid']);
				}
				else if(typeof dataObject['game'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['game']['titleId'], dataObject['xuid']);
				}
				//check xuid last because it has more than one function
				else if(typeof dataObject['xuid'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['xuid']);
				}
				else
				{
					window[dataObject['function']]();
					//checkLogin();
				}
			});
			break;
		case 'addClickListener':
			$('#'+dataObject['id']).on('click', function()
			{
				if(typeof dataObject['game'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['game']['titleId'], dataObject['xuid']);
				}
				else if(typeof dataObject['recentActivity'] !== 'undefined')
				{
					window[dataObject['function']](dataObject['recentActivity']['titleId'], dataObject['xuid']);
				}
				else
				{
					window[dataObject['function']](dataObject['xuid']);
					//checkLogin();
				}
			});
			break;
		case 'replaceButton':
			//replace the object id first
			$('#'+dataObject['idToRemove']).attr('id', dataObject['idToAdd']);
			//replace the value
			$('#'+dataObject['idToAdd']).val(dataObject['newValue']);
			break;
	}
}