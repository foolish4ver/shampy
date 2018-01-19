function donde_comprar_submit()
{
	var node_pais=$('#dnd_comprar_form .customStyleSelectBox');
	var node_ciudad=$('#dnd_comprar_form input[name="ciudad"]');
	var node_email=$('#dnd_comprar_form input[name="email"]');
	
	var pais = $('#dnd_comprar_form select option:selected').val();
	var ciudad = node_ciudad.val();
	var email = node_email.val();
	
	node_pais.removeClass('form_error');
	node_ciudad.removeClass('form_error');
	node_email.removeClass('form_error');
	
	if(pais == '' || pais == 'PAIS' || pais == 'COUNTRY' || pais == 'PAYS')
	{
		node_pais.addClass('form_error');
		return false;
	}
	if(ciudad == 'CIUDAD' || ciudad == 'CITY' || ciudad == 'VILLE' )
	{
		node_ciudad.addClass('form_error');
		return false;
	}
	if(email == 'E-MAIL')
	{
		node_email.addClass('form_error');
		return false;
	}

	if(checkEmail(email) == false)
	{
		node_email.addClass('form_error');
		return false;
	} 

	$("#dnd_comprar_form .form_result .form_ok").hide();
	$("#dnd_comprar_form .form_result .form_ko").hide();
	$("#dnd_comprar_form .form_loading").fadeIn();
		
	$.ajax({
		type: "POST",
		url: "./php/ajax_donde_comprar.php",
		data: "pais=" + pais + "&ciudad=" + ciudad + "&email=" + email,
			success: function(msg){
			document.forms['dnd_comprar_form'].reset();
			$("#dnd_comprar_form .form_loading").fadeOut(
				function(){
					if (msg == 'true')
					{
						$("#dnd_comprar_form .form_result .form_ko").hide();
						$("#dnd_comprar_form .form_result .form_ok").show().delay(500).fadeOut();
					}
					else
					{
						$("#dnd_comprar_form .form_result .form_ok").hide();
						$("#dnd_comprar_form .form_result .form_ko").show().delay(500).fadeOut();
					}
				}
			);
		}
	});
	return false;
};

function contacta_submit()
{
	var node_nombre=$('#contacta_form input[name="nombre"]');
	var node_email=$('#contacta_form input[name="email"]');
	var node_comentarios=$('#contacta_form textarea[name="comentarios"]');
	
	var nombre = node_nombre.val();
	var email_contacta = node_email.val();
	var comentarios = node_comentarios.val();
	
	node_nombre.removeClass('form_error');
	node_email.removeClass('form_error');
	node_comentarios.removeClass('form_error');
	
	if(nombre == 'NOMBRE' || nombre == 'NAME' || nombre == 'PRENOM' )
	{
		node_nombre.addClass('form_error');
		return false;
	}
	if(email_contacta == 'E-MAIL')
	{
		node_email.addClass('form_error');
		return false;
	}

	if(checkEmail(email_contacta) == false)
	{
		node_email.addClass('form_error');
		return false;
	} 
	if(comentarios == '' || comentarios == 'COMENTARIOS' || comentarios == 'COMMENTS' || comentarios == 'COMMENTAIRES' )
	{
		node_comentarios.addClass('form_error');
		return false;
	}

	$("#contacta_form .form_result .form_ok").hide();
	$("#contacta_form .form_result .form_ko").hide();
	$("#contacta_form .form_loading").fadeIn();
	
	$.ajax({
		type: "POST",
		url: "./php/ajax_contacta.php",
		data: "nombre=" + nombre + "&email_contacta=" + email_contacta + "&comentarios=" + comentarios,

		success: function(msg){
			document.forms['contacta_form'].reset();
			$("#contacta_form .form_loading").fadeOut(
				function(){
					if (msg == 'true')
					{
						$("#contacta_form .form_result .form_ko").hide();
						$("#contacta_form .form_result .form_ok").show().delay(3500).fadeOut();;
					}
					else
					{
						$("#contacta_form .form_result .form_ok").hide();
						$("#contacta_form .form_result .form_ko").show().delay(3500).fadeOut();;
					}
				}
			);
		}
	});
	return false;
};
	
function checkEmail(email) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(email)) {
		return false;
	}
};

function focusinHandler( event ){
	if ( this.value == event.data )
	{
		this.style.color = "#aaa";
	};
	this.selectionStart = 0;
	this.selectionEnd = 0;
};
function keypressHandler( event )
{
	if (this.value == event.data)
	{
		this.value = '';
	};
	this.style.color='#000';
};
function blurHandler( event)
{
	if (this.value == ''){
		this.value = event.data;
	};
	this.style.color='#000';
}

function setupForms()
{
	// donde comprar
	var form_ciudad=$('input[name="ciudad"]');
	form_ciudad.focusin("CIUDAD",focusinHandler);
	form_ciudad.keypress("CIUDAD",keypressHandler);
	form_ciudad.blur("CIUDAD",blurHandler);
	
	$('input[name="email"]').each(function(){
		$(this).focusin("E-MAIL",focusinHandler);
		$(this).keypress("E-MAIL",keypressHandler);
		$(this).blur("E-MAIL",blurHandler);
	});
	
	var form_name=$('input[name="nombre"]');
	form_name.focusin("NOMBRE",focusinHandler);
	form_name.keypress("NOMBRE",keypressHandler);
	form_name.blur("NOMBRE",blurHandler);
	
	var form_comentarios=$('textarea[name="comentarios"]');
	form_comentarios.focusin("COMENTARIOS",focusinHandler);
	form_comentarios.keypress("COMENTARIOS",keypressHandler);
	form_comentarios.blur("COMENTARIOS",blurHandler);
	
	$('#dnd_comprar_form input[name="button"]').click(donde_comprar_submit);
	$('#contacta_form input[name="button"]').click(contacta_submit);
};


