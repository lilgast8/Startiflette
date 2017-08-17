'use strict';


var AbstractPageView = require( 'desktop/abstracts/views/AbstractPageView' );



function Projects() {
	AbstractPageView.call( this );
}


Projects.prototype				= Object.create( AbstractPageView.prototype );
Projects.prototype.constructor	= Projects;


Projects.prototype.initDOM = function() {
	AbstractPageView.prototype.initDOM.call( this );
	
	this.$projectLink = this.$page.find( '.proj-link' );
};


Projects.prototype.bindEvents = function() {
	AbstractPageView.prototype.bindEvents.call( this );
	
	this.$projectLink.on( 'click', $.proxy( this.changeUrl, this ) );
};


Projects.prototype.unbindEvents = function() {
	AbstractPageView.prototype.unbindEvents.call( this );
	
	this.$projectLink.off( 'click', $.proxy( this.changeUrl, this ) );
};


Projects.prototype.resize = function() {
	
};


module.exports = Projects;

