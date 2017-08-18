'use strict';


var AbstractPagesController = require( 'shared/abstracts/controllers/AbstractPagesController' );

var Header			= require( 'desktop/views/statics/Header' );
var Footer			= require( 'desktop/views/statics/Footer' );



function PagesController() {
	AbstractPagesController.call( this );
	
	// this.LOADING_MODE			= null;
	// this.DYNAMIC_IMG_TO_LOAD	= null;
	// this.IS_HIDE_INIT			= null;
}


PagesController.prototype				= Object.create( AbstractPagesController.prototype );
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
	this.updateMenuLinks( Header.$menuLink );
	this.updateMenuLinks( Footer.$footerLink );
};


PagesController.prototype.manageLangLinks = function() {
	this.changeLangLinks( Header.$headerLgLink );
	this.changeLangLinks( Footer.$footerLgLink );
};


module.exports = new PagesController();

