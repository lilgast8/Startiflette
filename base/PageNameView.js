

APP.Views		= APP.Views || {};
APP.Views.Pages	= APP.Views.Pages || {};


APP.Views.Pages.PageNameView = ( function( window ) {
	
	
	function PageNameView() {
		APP.AbstractView.call( this );
	}
	
	
	PageNameView.prototype				= Object.create( APP.AbstractView.prototype );
	PageNameView.prototype.constructor	= PageNameView;
	
	
	PageNameView.prototype.initDOM = function() {
		this.$page = $( document.getElementById( 'page-content' ) );
	};
	
	
	PageNameView.prototype.bindEvents = function() {
		
	};
	
	
	PageNameView.prototype.unbindEvents = function() {
		
	};
	
	
	PageNameView.prototype.resize = function() {
		
	};
	
	
	return PageNameView;
	
	
} ) ( window );

