function jqueryUIWrapper(actionObject, elementObject)
{
	switch(actionObject['action'])
	{
		case 'fadeToGreen':
			$(elementObject['element']).animate(
			{
				backgroundColor: "#107c10"
	        }, 1000);
	        break;
	    default:
	    	alert('error');
	    	break;
	}
}