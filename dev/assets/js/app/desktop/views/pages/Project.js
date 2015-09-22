

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.Project = ( function( window ) {
	
	
	function Project() {
		APP.AbstractView.call( this );
	}
	
	
	Project.prototype				= Object.create( APP.AbstractView.prototype );
	Project.prototype.constructor	= Project;
	
	
	Project.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	Project.prototype.bindEvents = function() {
		
	};
	
	
	Project.prototype.unbindEvents = function() {
		
	};
	
	
	Project.prototype.resize = function() {
		
	};
	
	
	return Project;
	
	
} ) ( window );

