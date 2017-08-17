'use strict';


var AbstractPageView = require( 'desktop/abstracts/views/AbstractPageView' );



function Error404() {
	AbstractPageView.call( this );
}


Error404.prototype				= Object.create( AbstractPageView.prototype );
Error404.prototype.constructor	= Error404;


Error404.prototype.init = function() {
	AbstractPageView.prototype.init.call( this );
};


Error404.prototype.bindEvents = function() {
	AbstractPageView.prototype.bindEvents.call( this );
};


Error404.prototype.unbindEvents = function() {
	AbstractPageView.prototype.unbindEvents.call( this );
};


Error404.prototype.resize = function() {
	
};


module.exports = Error404;

