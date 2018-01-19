/**
 * Handles the hover over '.photo_link' elements
 * animating x position of the image.
 * 
 * @param e - event object
 */
function hoverOverPhoto(e) {
	var targetX=$(e.currentTarget).innerWidth()*-0.5;
	var command;
	switch( e.currentTarget.parentNode.parentNode.className ){
		case "photos_left":
			command={marginLeft:targetX+'px'};
			break;
		case "photos_right":
			command={marginRight:targetX+'px'};
			break;
		default:
			return false;
			break;
	}
	$(e.currentTarget).stop(true,true).animate(command,300,"easeInOutQuart");
}

/**
 * Handles the hover out '.photo_link' elements
 * animating x position of the image.
 * 
 * @param e - event object
 */
function hoverOutPhoto(e) {
	var command;
	switch( e.currentTarget.parentNode.parentNode.className ){
		case "photos_left":
			command={marginLeft:'0px'};
			break;
		case "photos_right":
			command={marginRight:'0px'};
			break;
		default:
			return false;
			break;
	}
	$(e.currentTarget).stop(true,true).animate(command,300,"easeInOutQuart");
}

/**
 * Setup Gallery viewer
 *
function setupGallery()
{
	//ACCION PARA MOSTRAR GALERIA
	$(".photo_link").click(function(){
		var ruta=$(this).attr("src");
		ruta = ruta.replace('img/fotos','img/hi_res');
		//alert(ruta);
		$('#preload').fadeIn();
		$("#outer_container").fadeIn(1000,function(){load_image(ruta);});	
	});

	//ACCION CERRAR GALERIA
	$('#outer_container').click(function(){
		$(this).fadeOut(300,function(){$('#container').html('');})
	});
}
*/
//CARGAR IMAGES EN PANE	
function load_image(ruta)
{
	//console.log("img",ruta,"loading");
	var img = new Image();
	$(img).load(function (ruta){
		//$(this).css('display', 'none'); // .hide() doesn't work in Safari when the element isn't on the DOM already
		$(this).hide();
		$('#outer_container #preload').fadeOut();
		$('#outer_container #pan_container').delay(250).html(this);
		//$(window).load();
		panThatImage();
		$(this).fadeIn('normal');
		$('#outer_container #close').fadeIn('normal', function(){
			$('#pane_wrapper').css('zIndex','3');
		    $('#pane_wrapper').animate({top:'0px', bottom:'0px'},500,"easeInOutQuart");
		});
	}).error(function () {
		unPanIt();
		// notify the user that the image could not be loaded
		}).attr('src', ruta).attr('class','panning');
};

