'use strict';


var AbstractPageView = require( 'desktop/abstracts/views/AbstractPageView' );



function Home() {
	AbstractPageView.call( this );
}


Home.prototype				= Object.create( AbstractPageView.prototype );
Home.prototype.constructor	= Home;


Home.prototype.init = function() {
	AbstractPageView.prototype.init.call( this );
};


Home.prototype.bindEvents = function() {
	AbstractPageView.prototype.bindEvents.call( this );
};


Home.prototype.unbindEvents = function() {
	AbstractPageView.prototype.unbindEvents.call( this );
};


Home.prototype.resize = function() {
	
};


module.exports = Home;

