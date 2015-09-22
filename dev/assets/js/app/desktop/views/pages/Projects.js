

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.Projects = ( function( window ) {
	
	
	function Projects() {
		APP.AbstractView.call( this );
	}
	
	
	Projects.prototype				= Object.create( APP.AbstractView.prototype );
	Projects.prototype.constructor	= Projects;
	
	
	Projects.prototype.initDOM = function() {
		this.$page			= $( document.getElementById( 'page-content' ) );
		this.$projectLink	= this.$page.find( '.project-link' );
	};
	
	
	Projects.prototype.bindEvents = function() {
		this.$projectLink.on( 'click', $.proxy( this.changePage, this ) );
	};
	
	
	Projects.prototype.unbindEvents = function() {
		this.$projectLink.off( 'click', $.proxy( this.changePage, this ) );
	};
	
	
	Projects.prototype.resize = function() {
		
	};
	
	
	return Projects;
	
	
} ) ( window );

