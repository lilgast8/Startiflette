

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.ProjectView = ( function( window ) {
	
	
	function ProjectView() {
		APP.AbstractView.call( this );
	}
	
	
	ProjectView.prototype				= Object.create( APP.AbstractView.prototype );
	ProjectView.prototype.constructor	= ProjectView;
	
	
	ProjectView.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	ProjectView.prototype.bindEvents = function() {
		
	};
	
	
	ProjectView.prototype.unbindEvents = function() {
		
	};
	
	
	ProjectView.prototype.resize = function() {
		
	};
	
	
	return ProjectView;
	
	
} ) ( window );

