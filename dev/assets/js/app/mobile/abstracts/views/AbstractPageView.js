

STF.AbstractPageView = ( function( window ) {
	'use strict';
	
	
	function AbstractPageView() {
		STF.AbstractView.call( this );
	}
	
	
	AbstractPageView.prototype				= Object.create( STF.AbstractView.prototype );
	AbstractPageView.prototype.constructor	= AbstractPageView;
	
	
	AbstractPageView.prototype.initDOM = function() {
		// console.log( 'AbstractPageView.initDOM() — ', this.constructor.name );
		
		this.$page = $( document.getElementById( 'page' ) );
	};
	
	
	AbstractPageView.prototype.initEl = function() {
		// console.log( 'AbstractPageView.initEl() — ', this.constructor.name );
		
		this.lazyLoader = new STF.LazyLoader( this.$page, 'img-lazyload', 1, true );
	};
	
	
	/*AbstractPageView.prototype.initTl = function() {
		
	};*/
	
	
	AbstractPageView.prototype.show = function() {
		this.dispatch( this.E.SHOWN );
	};
	
	
	AbstractPageView.prototype.hide = function() {
		this.dispatch( this.E.HIDDEN );
	};
	
	
	AbstractPageView.prototype.destroy = function() {
		STF.AbstractView.prototype.destroy.call( this );
		
		if ( this.lazyLoader !== undefined )
			this.lazyLoader.destroy();
	};
	
	
	/*AbstractPageView.prototype.onPageShown = function() {
		
	};*/
	
	
	/*AbstractPageView.prototype.onPageHidden = function() {
		
	};*/
	
	
	return AbstractPageView;
	
	
} ) ( window );

