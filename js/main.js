/**
 * Modernizr-style transition event switch
 * 
 */
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionEnd',
      'OTransition':'oTransitionEnd',
      'MSTransition':'msTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
};

function toggleVideoPlay( parent, turnOn )
{
	var video=document.querySelector("#"+parent.id+">video");
	if( turnOn )
	{
		video.play();
		document.querySelector("#"+parent.id+" .play").className="play hidden";
	}
	else
	{
		video.pause();
		document.querySelector("#"+parent.id+" .play").className="play";
	}
}
function onControllClick(e)
{
	if( e.target && e.currentTarget.nodeName == "DIV")
	{
		var parent=document.querySelector("#"+e.currentTarget.parentNode.id);
		var video=document.querySelector("#"+parent.id+">video");
		var turnOn= video.paused ? true : false;
		toggleVideoPlay( parent, turnOn );
	}
}

/**
 * Sets the #menu_years li item class to "selected" based on
 * position in main window.
 * TODO: MODERNIZ!
 */
function switchYears(e) {
	var array=new Array();
	$("#sec_aniversary>article").each(function(){
		var num=this.offsetTop-this.offsetParent.scrollTop;
		var difToCenter=$(this.parentNode).height()*0.5-num,constant;
		if(difToCenter>0) array.push(this);
	});
	if( array.length > 0 ){
		var selector=array[array.length-1].id;
		var patt1=new RegExp("([0-9]*)$");
		var item=document.querySelector("#menu_years #li"+patt1.exec(selector)[0]);
		if( item.className == "" ){
			var actualSelected = document.querySelector("#menu_years>.selected");
			
			if (!Modernizr.csstransitions)
			{
				$(actualSelected).stop(true,false).animate({fontSize:'20px', width:'77px'},200,"easeInOutQuart").removeClass('selected');
				$(item).stop(true,false).animate({fontSize:'60px', width:'140px'},200,"easeInOutQuart").addClass('selected');
			}
			else
			{
				actualSelected.className="";
				item.className="selected";
			}
		}
	};
}

/**
 * Clears all LI tags in the passed in UL
 * 
 * @param menu - UL to clear
 */
function clearSelecteds(menu) {
	var list = document.getElementById(menu.id).getElementsByTagName("LI");
	var i = 0;
	for( i; i<list.length; ++i){
		if( list[i].className == "selected" ){
			list[i].className = "";
			if( list[i].parentNode.className == "submenu" )
			{
				if(!$(list[i]).hasClass('hovered')){
					var tamano;
					var a = list[i].getElementsByTagName("A")[0];
					if($(list[i]).css('text-align') == "right"){
						tamano=$(a).innerWidth()-400;
					}else{
						tamano=-400;
					}
					$(a).stop(true,true).animate({backgroundPosition:'('+tamano+'px 0px)'},(-350*(tamano/400)),"easeInOutQuart");
				};
			};
		};
	};
};

/**
 * Moves and scales the bar indicator into position/size
 * 
 * @param target - the target menu-element
 * @param anim - if the transition is animated or not
 */
function moveBarTo( target, anim ){
	try
	{
		window.getComputedStyle(target).getPropertyValue('width');
		var targetWidth=$(target).width()+9;
		var targetPos=$(target).offset().left+1;
		if(!anim){
			$("#main_nav>span").css('width', targetWidth+'px');
			$("#main_nav>span").css('left', targetPos+'px');
		}else{
			$("#main_nav>span").stop(true,true).animate({width:targetWidth,left:targetPos},350,"easeInOutQuart");
		}
	}
	catch(err)
	{
		alert("error:"+err);
	}
}

/**
 * Switches zIndex order of the two upmost layer (0,-1)
 * clears the 
 */
function switchTops(e){
	e.currentTarget.removeEventListener( transitionEnd, switchTops, false );
	$("body>section").each(function(){if(this.style.zIndex == -1){this.style.zIndex=0;};});
	e.currentTarget.style.zIndex = -1;
	e.currentTarget.className="";
	$(e.currentTarget.children).each(function(){
							this.className="";
							this.style.left = '0px'; });
}

function switchTopsJQ( target )
{
	$("body>section").each(function(){if(this.style.zIndex == -1){this.style.zIndex=0;};});
	target.style.zIndex = -1;
	target.className="";
	$(target.children).each(function(){
							this.className="";
							this.style.left = '0px'; });
}

/**
 * Changes section visibility and z-index, animates into position
 * @param targetSection - the targetted section
 * @param targetZ - the sections current z index
 * TODO: MODERNIZ!
 */
function navigateTo(targetSection){
	// pause video if needed (visible)
	var currentSec=document.querySelector(".ontop");
	if( currentSec.id == "sec_video" || currentSec.id == "sec_makingof" )
	{
		var video = document.querySelector("#"+currentSec.id+" video");
		toggleVideoPlay( currentSec, false );
		video.hidden = true;
	}
	
	// reorder sections...
	var list=document.querySelectorAll("body>section");
	var selectedSection=document.querySelector("body>section#"+targetSection);
	var slideoutElement=document.querySelector(".slideout");
	var targetZ=selectedSection.style.zIndex;

		
	// awwwards banner
	var awww=document.querySelector("#awwward");
	if ( awww )
	{
		switch( targetSection )
		{
			case "sec_aniversary":
			{
				//$(awww).css('right','18px');
				//selectedSection.className="ontop slide";
				$(awww).stop(true,false).animate({right:'18px'},350,"easeInOutQuart");
				break;
			}
			default:
			{
				//$(awww).css('right','1px');
				$(awww).stop(true,false).animate({right:'1px'},350,"easeInOutQuart");
				break;
			}
		}
	};
	
	// if ontop section is moving to the right (aniversary selected previously)
	if(selectedSection.className=="ontop slideout")
	{
		if (Modernizr.csstransitions)
		{
			selectedSection.removeEventListener( transitionEnd, switchTops, false );
			window.getComputedStyle(selectedSection).getPropertyValue('left');	// force update of styles on element
			selectedSection.className="ontop slide";
			selectedSection.style.left = '0%';
		}
		else
		{
			selectedSection.className="ontop slide";
			$(selectedSection).stop(true,false).animate({left:'0%'},350,"easeInOutQuart");
		}
		return;
	}
	
	var sec;
	var muted=false;
	var i=0;
	for(i; i<list.length; ++i)
	{
		if(list[i].id == targetSection )
		{
			// selected section, move it to position from right to 0px
			sec = list[i];
			switch( targetSection )
			{
				case "sec_aniversary":
				{
					sec.style.zIndex = -1;
					sec.className="ontop";
					break;
				}
				default:
				{
					sec.style.left = $(document).width()+'px';
					window.getComputedStyle(sec).getPropertyValue('left');	// force update of styles on element
					if( targetSection == "sec_video" || targetSection == "sec_makingof" )
					{
						// unset class "hidden" on video
						var video = document.querySelector("#"+targetSection+" video");
						if(video) video.hidden = false;
					}
					sec.style.zIndex = 0;
					sec.className="ontop slide";
						
					if(Modernizr.csstransitions)
					{
						sec.style.left = '0%';
						$(sec.children).each(function(){
							this.style.left = $(document).width()+'px';
							window.getComputedStyle(this).getPropertyValue('left');
							this.className="delayed slide";
							this.style.left = '0%';
						});
					}
					else
					{
						$(sec).stop(true,false).animate({left:'0%'},350,"easeInOutQuart");
						$(sec.children).each(function(){
							this.style.left = $(document).width()+'px';
							this.className="delayed slide";
							$(this).stop(true,false).delay(200).animate({left:'0%'},350,"easeInOutQuart");
						});
					}
					break;
				}
			};
		}
		else
		{
			// the rest of the sections...
			if(list[i].style.zIndex == 0 )
			{
				if(slideoutElement)
				{
					list[i].style.zIndex = -2;
					list[i].className="";
				}
				else
				{
					switch( targetSection )
					{
						case "sec_aniversary":
						{
							if(Modernizr.csstransitions)
							{
								$(list[i].children).each(function(){
									this.style.left = '0%';
									window.getComputedStyle(this).getPropertyValue('left');
									this.className="slideout";
									this.style.left = $(document).width()+'px';
								});
								
								list[i].style.left = '0%';
								list[i].className="ontop delayedout slideout";
								window.getComputedStyle(list[i]).getPropertyValue('left');	// force update of styles on element
								list[i].style.left = $(document).width()+'px';
								list[i].addEventListener( transitionEnd, switchTops, false);
							}
							else
							{
								$(list[i].children).each(function(){
									this.style.left = '0%';
									this.className="slideout";
									$(this).stop(true,true).animate({left:'100%'},350,"easeInOutQuart");
								});
								
								list[i].style.left = '0%';
								list[i].className="ontop delayedout slideout";
								$(list[i]).stop(true,true).delay(150).animate({left:'100%'},350,"easeInOutQuart", switchTopsJQ(list[i]));
							}
							break;
						}
						default:
						{
							list[i].style.zIndex = -1;
							list[i].className="";
							$(list[i].children).each(function(){
								this.className="";
								this.style.left = '0px';
							});
							break;
						}
					};
				};
			}
			else
			{
				if( slideoutElement && list[i].style.zIndex == -1 )
				{}
				else{
					if(list[i].style.zIndex < targetZ)
					{
						list[i].style.zIndex = Number(list[i].style.zIndex) - 1;
					};
					list[i].className="invisible";
				};
			};
		};
	};
};

/**
 * Handles the clicks on the menus "menu_nav" and "menu_lang",
 * taking action according to element clicked.
 * 
 * @param e - event object
 */
function onClickHandlerMainMenu(e) {
	if(e.target){
		var navTo=false;
		var navTarget;
		
		switch(e.currentTarget.id)
		{
			case "menu_nav":
			{
				navTo=true;
			}
			case "menu_lang":
			{
				if(e.target.nodeName == "A" || e.target.nodeName == "IMG" ) {
					if(e.target.parentNode.className != "selected") {
						if( e.target.parentNode.id =="timemachine" )
						{
							window.open("http://www.loisjeans.com/thetimemachine");
							return;
						}
						
						// clear selected on other buttons... e.currentTarget is "menu_nav" || "menu_lang"
						clearSelecteds( e.currentTarget );
						clearSelecteds( document.querySelector("#menu_footer") );
						
						var isSub=false;
						if(e.target.parentNode.parentNode.className == "submenu")
						{
							// set class selected on menu, if clicked is child of submenu...
							e.target.parentNode.parentNode.parentNode.className="selected";
							isSub=true;
						}
						else
						{
							// if submenu clicked, set first children "selected"
							var list = e.target.parentNode.getElementsByTagName("UL");
							if(list[0]){
								list.item(0).getElementsByTagName("LI")[0].className = "selected";
								navTarget="sec_"+list.item(0).getElementsByTagName("LI")[0].id;
								// TODO: move this to a function!
								var tamano;
								var a = list.item(0).getElementsByTagName("A")[0];
								if($(this).css('text-align') == "right"){
									tamano=-400-$(a).innerWidth();
								}else{
									tamano=$(a).innerWidth()-400;
								};
								$(a).stop(true,true).animate({backgroundPosition:'('+tamano+'px 0px)'},(-350*(tamano/400)),"easeInOutQuart");
							};
						};
						// set class selected on clicked element...
						e.target.parentNode.className="selected";
						
						if(!navTarget){
							navTarget="sec_"+e.target.parentNode.id;
						};
						
						// move spanBar into position
						if(!isSub){
							// if not submenu, move to <a>
							moveBarTo(e.target.parentNode, true);
						}else if(e.currentTarget.id != "menu_lang") {
							// if submenu, move to parent <a>
							moveBarTo(e.target.parentNode.parentNode.parentNode, true);
						};
					};
				};
				if(navTarget && navTo){
					if( $("#outer_container").css('display') != "none" ){
						unPanIt();
						$("#outer_container").fadeOut(300,function(){
							$('#outer_container #close').hide();
							$('#outer_container #pan_container').html('');
						});
					}
					navigateTo(navTarget);
				}
				break;
			};
			case "menu_footer":
			{
				if(e.target.nodeName == "A" )
				{
					clearSelecteds( document.querySelector("#menu_nav") );
					clearSelecteds( document.querySelector("#menu_footer") );
					e.target.parentNode.className="selected";
					$("#main_nav>span").css('width', '0px');
					$("#main_nav>span").css('left', '0px');
					if( $("#outer_container").css('display') != "none" ){
						unPanIt();
						$("#outer_container").fadeOut(300,function(){
							$('#outer_container #pan_container').html('');
							$('#outer_container #close').hide();
						});
					}
					navigateTo("sec_"+e.target.parentNode.id);
				};
				break;
			}
			default:
				break;
		};
	};
};

/**
 * Handles the clicks on the section 'aniversary',
 * taking action according to element clicked.
 * Element can be 'a' or 'img'
 * 
 * @param e - event object
 */
function onClickHandlerAniversary(e) {
	if(e.target){
		var navTo=false;
		var navTarget;
		if(e.target.nodeName == "A")
		{
			$('#sec_aniversary').unbind('scroll', switchYears );
			var actualSelected = document.querySelector("#menu_years>.selected");
			if (!Modernizr.csstransitions)
			{
				$(actualSelected).stop(true,false).animate({fontSize:'20px', width:'77px'},200,"easeInOutQuart").removeClass('selected');
				$(e.target.parentNode).stop(true,false).animate({fontSize:'60px', width:'140px'},200,"easeInOutQuart").addClass('selected');
			}
			else
			{
				actualSelected.className="";
				e.target.parentNode.className="selected";
			}
			
			// scrolling to target section/article
			var patt1=new RegExp("([0-9]*)$");
			var sel=document.querySelector("#year"+patt1.exec(e.target.parentNode.id)[0]);
			$("#sec_aniversary").scrollTo(sel.offsetTop+'px',1500,{easing:'easeInOutQuart',onAfter:function(){$('#sec_aniversary').bind('scroll', switchYears );}});
		}
		else if(e.target.nodeName == "IMG" && e.target.className == "photo_link")
		{
			var ruta = e.target.src;
			ruta = ruta.replace('img/fotos','img/hi_res');
			$('#outer_container #close').hide();
			$('#outer_container #preload').fadeIn();
			$('#pane_wrapper').fadeIn(1000,function(){ load_image(ruta); });
		}
	};
};

/**
 * Handles the hover over menu elements that have submenus,
 * animates the height.
 * 
 * @param e - event object
 */
function hoverOverSub(e) {
	var target = this.getElementsByTagName("UL")[0];
	$(target).css('height','auto');
	var totalHeight = $(target).css('height');
	$(target).css('height','0px');
	$(target).stop(true,false).animate({height:totalHeight},350,"easeInOutQuart");
};

/**
 * Handles the hover out menu elements that have submenus,
 * animates the height.
 * 
 * @param e - event object
 */
function hoverOutSub(e) {
	var target = this.getElementsByTagName("UL")[0];
	$(target).stop(true,false).animate({height:'0px'},350,"easeInOutQuart");
};

/**
 * Handles the hover over menu elements that are children of submenus,
 * animates x position of background image.
 * 
 * @param e - event object
 */
function hoverOverSubelement(e) {
	if(this.className != "selected"){
		$(this).addClass('hovered');
		var tamano;
		var a = this.getElementsByTagName("A")[0];
		if($(this).css('text-align') == "right"){
			tamano=-400-$(a).innerWidth();
		}else{
			tamano=$(a).innerWidth()-400;
		};
		$(a).stop(true,true).animate({backgroundPosition:'('+tamano+'px 0px)'},(-350*(tamano/400)),"easeInOutQuart");
	}
}

/**
 * Handles the hover out menu elements that are children of submenus,
 * animates x position of background image.
 * 
 * @param e - event object
 */
function hoverOutSubelement(e) {
	if(this.className != "selected"){
		$(this).removeClass('hovered');
		var tamano;
		var a = this.getElementsByTagName("A")[0];
		if($(this).css('text-align') == "right"){
			tamano=$(a).innerWidth()-400;
		}else{
			tamano=-400;
		};
		$(a).stop(true,true).animate({backgroundPosition:'('+tamano+'px 0px)'},(-350*(tamano/400)),"easeInOutQuart");
	}
}

// CUSTOM SCROLL BARS
function mCustomScrollbars(){
	/* 
	malihu custom scrollbar function parameters: 
	1) scroll type (values: "vertical" or "horizontal")
	2) scroll easing amount (0 for no easing) 
	3) scroll easing type 
	4) extra bottom scrolling space for vertical scroll type only (minimum value: 1)
	5) scrollbar height/width adjustment (values: "auto" or "fixed")
	6) mouse-wheel support (values: "yes" or "no")
	7) scrolling via buttons support (values: "yes" or "no")
	8) buttons scrolling speed (values: 1-20, 1 being the slowest)
	*/
	var count=0;
	$("#sec_novedades .content_container>li>section").each( function(){
		this.id="scroll_" + ++count;	// requires unique ids
		$(this).mCustomScrollbar("vertical",500,"easeOutCirc",1.05,"auto","yes","no",0);
	});
};

/**
 * Sets up global page event handlers with jQuery
 */
function setupEventHandlers() {
	// menus
	$("#menu_nav").on("click", onClickHandlerMainMenu);
	$("#menu_lang").on("click", onClickHandlerMainMenu);
	$("#menu_footer").on("click", onClickHandlerMainMenu);
	$('#campanya').hover( hoverOverSub, hoverOutSub );
	$('#idioma').hover( hoverOverSub, hoverOutSub );
	
	$('.submenu>li').hover(hoverOverSubelement,hoverOutSubelement);
	
	$('.photo_link').hover( hoverOverPhoto, hoverOutPhoto );
	$("#sec_aniversary").on("click", onClickHandlerAniversary);
	$('#sec_aniversary').bind('scroll', switchYears );
	
	$("#sec_novedades .buttons_container").on("click", onButtonClickHandler );
	$("#sec_business .buttons_container").on("click", onButtonClickHandler );
	
	$('#sec_descargas li').hover( hoverOverDownload, hoverOutDownload );
	//ACCION CERRAR GALERIA
	$('#pane_wrapper').click(function(){
		$(this).fadeOut(300,function(){
			unPanIt();
			$('#pane_wrapper').css('top','58px');
			$('#pane_wrapper').css('bottom','22px');
			$('#outer_container #pan_container').html('');
			$(this).css('zIndex','1');
		});
	});
};

/**
 * Sets the global page default handlers
 */
function initDefaults() {
	// language query of url
	var pattern = new RegExp('[a-z]*$','g');
	var result=pattern.exec(window.location);
	if( result && result[0]!="html" )
	{
		locale=result[0];
	}
	else
	{
		locale="es";
	}
	
	// document.querySelector('#lang_'+locale+'>a').removeAttribute('href');
	
	// setting selected menus
	$("#campanya").addClass("selected");
	$("#aniversary").addClass("selected");
	$("#idioma").addClass("selected");
	$("#menu_years>#li2012").addClass("selected");
	$('#lang_'+locale).addClass("selected"); // todo: get from URL
	
	// fondos de submenu-elementos
	var list;
	var i=0;
	$("#aniversary a").css('background-position','-'+(400-$("#aniversary a").innerWidth())+'px 0px');
	list = document.getElementById("idioma").getElementsByTagName("LI");
	for(i; i<list.length; ++i){
		var a =$(list[i].getElementsByTagName("A").item(0));
		$(a).css('background-position',(a.innerWidth()-400)+'px 0px');
	};
	$('#lang_'+locale+'>a').css('background-position','-400px 0px'); // todo: get from URL

	// drawing bar
	moveBarTo(document.getElementById("campanya"), false);
	
	// setting sections order
	document.getElementById("sec_aniversary").className="selected";
	
	list = $("body>section");
	i=0;
	var j=0;
	for(i; i<list.length; ++i){
		if(list[i].className != "selected")
		{
			list[i].style.zIndex=j-1;
			--j;
		}else{
			list[i].style.zIndex="0";
			list[i].className="ontop";
		};
	};
	
	// CARGA CUSTOM SCROLL BARS
	mCustomScrollbars();
	
	// Form select class customization
	$('select.styled').customStyle();
	
	// NOVEDADES / BUSINESS buttons and content
	updateButtonsControl( "sec_novedades" );
	updateButtonsControl( "sec_business" );
	
	if(!Modernizr.csstransitions)
	{
		killCSSRule("#years_nav li:not(.selected):hover");
		$("#years_nav li").hover( function(){
			if( this.className != "selected" ) $(this).stop(true,false).animate({fontSize:'60px', width:'140px'},200,"easeInOutQuart");
		}, function (){
			if( this.className != "selected" ) $(this).stop(true,false).animate({fontSize:'20px', width:'77px'},200,"easeInOutQuart");
		});
	}
	
	// imagenes grandes en contenedor izq a la "rtl", drcha a la "ltr"
	// (las que no tienen rollover alinear al centro)
	list = document.querySelectorAll(".photos_left img");
	$(list).each(function(){ if( this.className != "photo_link") $(this.parentNode).css('direction','rtl');}); //$(list).each(function(){ if( this.className != "photo_link" && this.width > Number(550) ) $(this.parentNode).css('direction','rtl');});
	list = document.querySelectorAll(".photos_right img");
	$(list).each(function(){ if( this.className != "photo_link") $(this.parentNode).css('direction','ltr');});
};

function setupVideo()
{
	if(!!document.createElement('video').canPlayType)
	{
		document.querySelector("#sec_video video").hidden = true;
		document.querySelector("#sec_makingof video").hidden = true;
		
		$("#sec_video>div").bind("click", onControllClick);
		$("#sec_makingof>div").bind("click", onControllClick);
	}
	else
	{
		$("#sec_video>div").css('display','none');
		$("#sec_makingof>div").css('display','none');
	}
};
/**
 * MAIN
 * 
 * http://code.google.com/speed/articles/compressing-javascript.html
 */
var locale;
var transitionEnd = whichTransitionEvent();
var audio=true;

$(window).load( function(e){
	$("body>section").removeClass("hidden");
	
	initDefaults();
	
	// setupVideo();
	setupParallax();
	setupEventHandlers();
	setupForms();
	
});

