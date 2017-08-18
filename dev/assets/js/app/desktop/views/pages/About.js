'use strict';


var AbstractPageView = require( 'desktop/abstracts/views/AbstractPageView' );



function About() {
	AbstractPageView.call( this );
}


About.prototype				= Object.create( AbstractPageView.prototype );
About.prototype.constructor	= About;


About.prototype.init = function() {
	AbstractPageView.prototype.init.call( this );
};


About.prototype.bindEvents = function() {
	AbstractPageView.prototype.bindEvents.call( this );
};


About.prototype.unbindEvents = function() {
	AbstractPageView.prototype.unbindEvents.call( this );
};


About.prototype.resize = function() {
	
};


module.exports = About;

