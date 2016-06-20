

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Projects = ( function( window ) {
	'use strict';
	
	
	function Projects() {
		STF.AbstractView.call( this );
	}
	
	
	Projects.prototype				= Object.create( STF.AbstractView.prototype );
	Projects.prototype.constructor	= Projects;
	
	
	Projects.prototype.initDOM = function() {
		STF.AbstractView.prototype.initDOM.call( this );
		
		this.$projectLink = this.$page.find( '.project-link' );
	};
	
	
	Projects.prototype.bindEvents = function() {
		STF.AbstractView.prototype.bindEvents.call( this );
		
		this.$projectLink.on( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	Projects.prototype.unbindEvents = function() {
		STF.AbstractView.prototype.unbindEvents.call( this );
		
		this.$projectLink.off( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	Projects.prototype.resize = function() {
		
	};
	
	
	return Projects;
	
	
} ) ( window );

