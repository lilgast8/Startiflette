

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Projects = ( function( window ) {
	'use strict';
	
	
	function Projects() {
		STF.AbstractPageView.call( this );
	}
	
	
	Projects.prototype				= Object.create( STF.AbstractPageView.prototype );
	Projects.prototype.constructor	= Projects;
	
	
	Projects.prototype.initDOM = function() {
		STF.AbstractPageView.prototype.initDOM.call( this );
		
		this.$projectLink = this.$page.find( '.proj-link' );
	};
	
	
	Projects.prototype.bindEvents = function() {
		STF.AbstractPageView.prototype.bindEvents.call( this );
		
		this.$projectLink.on( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	Projects.prototype.unbindEvents = function() {
		STF.AbstractPageView.prototype.unbindEvents.call( this );
		
		this.$projectLink.off( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	Projects.prototype.resize = function() {
		
	};
	
	
	return Projects;
	
	
} ) ( window );

