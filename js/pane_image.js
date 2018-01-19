function unPanIt()
{
	$("#imagePan").unbind("mousemove");
	$("#outer_container #close").unbind("mousemove");
	$(window).unbind("resize", onWindowResize);
}
function panThatImage()
{
	var outer_container=$("#outer_container");
	var imagePan_panning=$("#imagePan .panning");
	var imagePan=$("#imagePan");
	var imagePan_container=$("#imagePan #pan_container");

	//outer_container.css("top", ($(window).height()-(outer_container.outerHeight()))/2);
	imagePan_panning.css("margin-top",(imagePan.height()-imagePan_panning.height())/2+"px");
	var containerWidth=imagePan.width();
	var containerHeight=imagePan.height();
	var totalContentW=imagePan_panning.width();
	var totalContentH=imagePan_panning.height();
	imagePan_container.css("width",totalContentW).css("height",totalContentH);
	imagePan_container.css("left",0).css("top",0);

	imagePan_panning.css("margin-left",(imagePan.width()-imagePan_panning.width())/2).css("margin-top",(imagePan.height()-imagePan_panning.height())/2);

	imagePan.bind("mousemove", MouseMove );
	
	$(window).bind("resize", onWindowResize);
};
function MouseMove(e)
{
	var closeB=$("#outer_container #close");
	closeB.css( 'left', e.pageX+10);
	closeB.css( 'top', e.pageY-closeB.height());
	
	var imagePan_panning=$("#imagePan .panning");
	var imagePan=$("#imagePan");
	var imagePan_container=$("#imagePan #pan_container");
	
	var containerWidth=imagePan.width();
	var containerHeight=imagePan.height();
	var totalContentW=imagePan_panning.width();
	var totalContentH=imagePan_panning.height();
	
	var thePosA, thePosB, thePosC, thePosD;
	if ( totalContentW > containerWidth )
	{
		var mouseCoordsX=(e.pageX - imagePan.offset().left);
		var mousePercentX=mouseCoordsX/containerWidth;
		var destX=-(((totalContentW-(containerWidth))-containerWidth)*(mousePercentX));
		thePosA=mouseCoordsX-destX;
		thePosB=destX-mouseCoordsX;
	}
	else
	{
		thePosA=thePosB=destX=(totalContentW-(containerWidth))*0.5;
	}
	
	if ( totalContentH > containerHeight )
	{
		var mouseCoordsY=(e.pageY - imagePan.offset().top);
		var mousePercentY=mouseCoordsY/containerHeight;
		var destY=-(((totalContentH-(containerHeight))-containerHeight)*(mousePercentY));
		thePosC=mouseCoordsY-destY;
		thePosD=destY-mouseCoordsY;
	}
	else
	{
		thePosC=thePosD=destY=(totalContentH-(containerHeight))*0.5;
	}
	
	
  	var cssMarginLeft=imagePan_panning.css("marginLeft");
  	var cssMarginTop=imagePan_panning.css("marginTop");
  	var marginL=cssMarginLeft ? cssMarginLeft.replace("px", "") : 0;
  	var marginT=cssMarginTop ? cssMarginTop.replace("px", "") : 0;
 	var animSpeed=500; //ease amount
  	var easeType="easeOutCirc";
	
	var command = new Object();
  	if(mouseCoordsX > destX || mouseCoordsY > destY){
		//$imagePan_container.css("left",-thePosA-marginL); $imagePan_container.css("top",-thePosC-marginT); //without easing
		imagePan_container.stop().animate( {left: -thePosA-marginL, top: -thePosC-marginT}, animSpeed,easeType); //with easing
		/*
		if ( totalContentW > containerWidth )
		{
			command.left = -thePosA-marginL;
		}
		if ( totalContentH > containerHeight )
		{
			command.top = -thePosC-marginT;
		}
	  	
		if ( command.left || command.top ) imagePan_container.stop().animate( command, animSpeed,easeType); //with easing
		*/
  	}else if(mouseCoordsX<destX || mouseCoordsY<destY){
		//$imagePan_container.css("left",thePosB-marginL); $imagePan_container.css("top",thePosD-marginT); //without easing
	  	imagePan_container.stop().animate({left: thePosB-marginL, top: thePosD-marginT}, animSpeed,easeType); //with easing
		/*
		if ( totalContentW > containerWidth )
		{
			command.left = thePosB-marginL;
		}
		if ( totalContentH > containerHeight )
		{
			command.top = thePosD-marginT;
		}
	  	if ( command.left || command.top ) imagePan_container.stop().animate(command, animSpeed,easeType); //with easing
		*/
  	} else {
		imagePan_container.stop();
  	}
}

function onWindowResize() {
	var imagePan=$("#imagePan");
	var imagePan_container=$("#imagePan #pan_container");
	imagePan.unbind("mousemove");
	imagePan_container.css("top",0).css("left",0);
	panThatImage();
};


