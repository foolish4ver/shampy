//PARALLAX
/**
* Author: Richard Shepherd
* Modified by Nectar Estudio S.L.
*/
function setupParallax()
{
	// Cache the Window object
	$window = $('#sec_aniversary');
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	
	// For each element that has a data-type attribute
	$('section[data-type="background"]').each(function(){
		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...
		$('#sec_aniversary').scroll(function() {
			// If this section is in view
			if ( ($window.scrollTop() + $window.height()) > (topOffset) && ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / $self.data('speed'));
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				// Put together our final background position
				var coords = '(50% '+ yPos + 'px)';
				
				//Move the div
				//var yPos_top = -($window.scrollTop() / $self.data('speed'));
				//var coords_top = (yPos + $self.data('offsetY')) + 'px';
				//$self.stop().animate({top: coords_top}, 600, "easeOutExpo");	
				
				// Move the background
				//$self.css({ backgroundPosition: coords });
				$self.stop().animate({ backgroundPosition: coords }, 1500,"easeOutExpo");
				
				// Check for other sprites in this section	
				$('[data-type="background_sprite"]', $self).each(function() {
					// Cache the sprite
					var $background_sprite = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $background_sprite.data('speed'));					
					var coords = $background_sprite.data('Xposition') + ' ' + (yPos + $background_sprite.data('offsetY')) + 'px';
					
					//background_sprite.css({ backgroundPosition: coords });
					$background_sprite.stop().animate({backgroundPosition: coords}, 1500, "easeOutQuart", function(){});														
					
				}); // sprites
				
				// Check for other elements in this section	
				$('[data-type="element"]', $self).each(function() {
					// Cache the sprite
					var $element = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite		
					var yPos = -($window.scrollTop() / $element.data('speed'));					
					var coords = (yPos + $element.data('offsetY')) + 'px';
					//$element.css({ top: coords });
					$element.stop().animate({top: coords}, 1500, "easeOutExpo", function(){});
				}); // elements
			}; // in view
		}); // window scroll
	});	// each data-type
};


