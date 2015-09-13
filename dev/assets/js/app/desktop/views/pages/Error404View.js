

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.Error404View = ( function( window ) {
	
	
	function Error404View() {
		APP.AbstractView.call( this );
	}
	
	
	Error404View.prototype				= Object.create( APP.AbstractView.prototype );
	Error404View.prototype.constructor	= Error404View;
	
	
	Error404View.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	Error404View.prototype.bindEvents = function() {
		
	};
	
	
	Error404View.prototype.unbindEvents = function() {
		
	};
	
	
	Error404View.prototype.resize = function() {
		
	};
	
	
	return Error404View;
	
	
} ) ( window );

