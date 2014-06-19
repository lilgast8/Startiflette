/*******************************/
/* -------- Variables -------- */
/*******************************/


/* -------- Mise en page -------- */
var $window;
var $body;





/*******************************/
/* -------- Fonctions -------- */
/*******************************/

// TweenLite.to('element', duration, {property:value, ease:Expo.easeOut});





/****************************/
/* -------- jQuery -------- */
/****************************/
$(function(){
	
	
	/**************************/
	/* -------- Init -------- */
	/**************************/
	
	
	/* -------- Mise en page -------- */
	$window = $(window);
	$body = $(document.body);
	
	
	
	
	
	/*****************************/
	/* -------- Adresse -------- */
	/*****************************/
	
	
	$.address.change(function(fct){
		
	});
	
	
	
	
	
	/*****************************/
	/* -------- Préload -------- */
	/*****************************/
	
	
	/* -------- Liste images à charger -------- */
	var tabImgsACharger = new Array(
		// Background
	//	'images/bgs/liste-image.png'
		// Boutons
		// Divers
		// Logos
	);
	
	var nbImgsACharger = tabImgsACharger.length;
	var nbImgChargees = 0;
	$.each(tabImgsACharger, function(index, value) {
		$('<img/>').load(function(){
			nbImgChargees++;
			if(nbImgsACharger == nbImgChargees) {
				$window.trigger('resize');
			}
		}).attr('src', value);
	});
	
	
	
	
	
	/****************************/
	/* -------- Resize -------- */
	/****************************/
	
	
	$window.resize(function(){
		
	});
	
	$window.trigger('resize');
	
	
});