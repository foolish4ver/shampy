function onButtonClickHandler(e)
{
	if(e.target.parentNode == e.currentTarget )
	{
		var id=e.currentTarget.parentNode.parentNode.id;
		var content=document.querySelector("#"+id+" .content_container");
		var articles=document.querySelectorAll("#"+id+" .content_container>li");
		var index=Number($(content).data('index'));
		var targetX;
		
		switch( e.target.className )
		{
			case "right_button":
				if( index < articles.length-1 )
				{
					$(content).data('index', index+1);
					targetX=$(articles[0]).outerWidth()*(index+1);
				}
				break;
			case "left_button":
				if( index > 0 )
				{
					$(content).data('index', index-1);
					targetX=$(articles[0]).outerWidth()*(index-1);
				}
				break;
			default:
				break;
		}
		
		if(Modernizr.csstransitions)
		{
			content.style.left=-targetX+"px";
		}
		else
		{
			$(content).stop(true,false).animate({left:-targetX+"px"},450,"easeInOutQuart" );
		}
		updateButtonsControl( id );
	}
}

/**
 * Looks up number of 'content' in target sections, and
 * changes buttons states if needed and sets counter
 */
function updateButtonsControl( targetSec )
{
	var content=document.querySelector("#"+targetSec+" .content_container");
	var articles=document.querySelectorAll("#"+targetSec+" .content_container>li");
	
	var counter=document.querySelector("#"+targetSec+" .counter");
	var index=Number($(content).data('index'));
	$(counter).text(String((index+1)+"/"+(articles.length)));
	
	var leftButton=document.querySelector("#"+targetSec+" .buttons_container .left_button");
	var rightButton=document.querySelector("#"+targetSec+" .buttons_container .right_button");
	
	if( articles.length < 2 )
	{
		$(leftButton).addClass('invisible');
		$(rightButton).addClass('invisible');
		return;
	}
	
	switch ( index )
	{
		case 0:
		{
			//console.log("case 0");
			if( !$(leftButton).hasClass('invisible') ) $(leftButton).addClass('invisible');
			if( $(rightButton).hasClass('invisible') ) $(rightButton).removeClass('invisible');
			break;
		}
		case (articles.length-1) :
		{
			//console.log("case middle", articles.length-1);
			if( $(leftButton).hasClass('invisible') ) $(leftButton).removeClass('invisible');
			if( !$(rightButton).hasClass('invisible') ) $(rightButton).addClass('invisible');
			break;
		}
		default:
		{
			//console.log("default case");
			if( $(leftButton).hasClass('invisible') ) $(leftButton).removeClass('invisible');
			if( $(rightButton).hasClass('invisible') ) $(rightButton).removeClass('invisible');
			break;
		}
	}
	
	// change title
	var titles=document.querySelectorAll("#"+targetSec+" .subtitular_page>ul>li");
	if(titles && titles.length!=0)
	{
		var i=0;
		for(i;i<titles.length;++i)
		{
			titles[i].className = i == index ? "" : "hidden";
		}
	}
}

