

STF.PagesController = ( function( window ) {
	'use strict';
	
	
	function PagesController() {
		STF.AbstractPagesController.call( this );
	}
	
	
	PagesController.prototype				= Object.create( STF.AbstractPagesController.prototype );
	PagesController.prototype.constructor	= PagesController;
	
	
	/*PagesController.prototype.initPages = function() {
		
	};*/
	
	
	/*PagesController.prototype.managePageHidingTransitions = function() {
		
	};*/
	
	
	/*PagesController.prototype.checkPageHiding = function() {
		
	};*/
	
	
	/*PagesController.prototype.managePageShowingTransitions = function() {
		
	};*/
	
	
	/*AbstractPagesController.prototype.checkPageShowing = function() {
		
	};*/
	
	
	return new PagesController();
	
	
} ) ( window );

