

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.ProjectsView = ( function( window ) {
	
	
	function ProjectsView() {
		APP.AbstractView.call( this );
	}
	
	
	ProjectsView.prototype				= Object.create( APP.AbstractView.prototype );
	ProjectsView.prototype.constructor	= ProjectsView;
	
	
	ProjectsView.prototype.initDOM = function() {
		this.$page			= $( document.getElementById( 'page-content' ) );
		this.$projectLink	= this.$page.find( '.project-link' );
	};
	
	
	ProjectsView.prototype.bindEvents = function() {
		this.$projectLink.on( 'click', $.proxy( this.changePage, this ) );
	};
	
	
	ProjectsView.prototype.unbindEvents = function() {
		this.$projectLink.off( 'click', $.proxy( this.changePage, this ) );
	};
	
	
	ProjectsView.prototype.resize = function() {
		
	};
	
	
	return ProjectsView;
	
	
} ) ( window );

