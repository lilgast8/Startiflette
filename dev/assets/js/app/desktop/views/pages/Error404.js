

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.Error404 = ( function( window ) {
	
	
	function Error404() {
		APP.AbstractView.call( this );
	}
	
	
	Error404.prototype				= Object.create( APP.AbstractView.prototype );
	Error404.prototype.constructor	= Error404;
	
	
	Error404.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	Error404.prototype.bindEvents = function() {
		
	};
	
	
	Error404.prototype.unbindEvents = function() {
		
	};
	
	
	Error404.prototype.resize = function() {
		
	};
	
	
	return Error404;
	
	
} ) ( window );

