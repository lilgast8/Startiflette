'use strict';


// var AbstractPagesController = require( 'shared/abstracts/controllers/AbstractPagesController' );
var PagesController	= require( 'desktop/controllers/PagesController' );
var MainView		= require( 'desktop/views/MainView' );



function GlobalController() {
	
}


// GlobalController.prototype				= Object.create( AbstractGlobalController.prototype );
// GlobalController.prototype.constructor	= GlobalController;


GlobalController.prototype.init = function() {
	var PagesController	= require( 'desktop/controllers/PagesController' );
	var MainView		= require( 'desktop/views/MainView' );
};


module.exports = new GlobalController();

