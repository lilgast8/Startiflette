

STF.PagesController = ( function( window ) {
	'use strict';
	
	
	function PagesController() {
		STF.AbstractPagesController.call( this );
		
		// this.LOADING_MODE			= null;
		// this.DYNAMIC_IMG_TO_LOAD	= null;
		// this.IS_HIDE_INIT			= null;
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
	
	
	PagesController.prototype.manageMenuLinks = function() {
		this.updateMenuLinks( STF.Views.Statics.Header.$menuLink );
		this.updateMenuLinks( STF.Views.Statics.Footer.$footerLink );
	};
	
	
	PagesController.prototype.manageLangLinks = function() {
		this.changeLangLinks( STF.Views.Statics.Header.$headerLgLink );
		this.changeLangLinks( STF.Views.Statics.Footer.$footerLgLink );
	};
	
	
	return new PagesController();
	
	
} ) ( window );

