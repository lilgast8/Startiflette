'use strict';


var AbstractMainView = require( 'shared/abstracts/views/AbstractMainView' );

// var Path			= require( 'shared/configs/Path' );



function MainView() {
	AbstractMainView.call( this );
}


MainView.prototype				= Object.create( AbstractMainView.prototype );
MainView.prototype.constructor	= MainView;


/*MainView.prototype.initDOM = function() {
	AbstractMainView.prototype.initDOM.call( this );
};*/


MainView.prototype.initEl = function() {
	// console.log( '🐷', this );
	
	AbstractMainView.prototype.initEl.call( this );
	
	this.disableScrollRestoration();
};


/*MainView.prototype.bindEvents = function() {
	AbstractMainView.prototype.bindEvents.call( this );
};*/


/*MainView.prototype.initStaticsViews = function() {
	AbstractMainView.prototype.initStaticsViews.call( this );
};*/


module.exports = new MainView();

