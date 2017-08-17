'use strict';


var AbstractPageView = require( 'desktop/abstracts/views/AbstractPageView' );



function Project() {
	AbstractPageView.call( this );
}


Project.prototype				= Object.create( AbstractPageView.prototype );
Project.prototype.constructor	= Project;


Project.prototype.init = function() {
	AbstractPageView.prototype.init.call( this );
};


Project.prototype.bindEvents = function() {
	AbstractPageView.prototype.bindEvents.call( this );
};


Project.prototype.unbindEvents = function() {
	AbstractPageView.prototype.unbindEvents.call( this );
};


Project.prototype.resize = function() {
	
};


module.exports = Project;

