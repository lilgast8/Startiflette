

STF.AbstractPageView = ( function( window ) {
	'use strict';
	
	
	function AbstractPageView() {
		STF.AbstractView.call( this );
		
		this.imgToLazyloadClassName	= 'img-lazyload'; // class name of images to lazyload
		this.lazyloadParentEl		= null; // selector of parent of images to lazyload
	}
	
	
	AbstractPageView.prototype				= Object.create( STF.AbstractView.prototype );
	AbstractPageView.prototype.constructor	= AbstractPageView;
	
	
	AbstractPageView.prototype.initDOM = function() {
		// console.log( 'AbstractPageView.initDOM() — ', this.constructor.name );
		
		this.$page = $( document.getElementById( 'page' ) );
	};
	
	
	AbstractPageView.prototype.initEl = function() {
		// console.log( 'AbstractPageView.initEl() — ', this.constructor.name );
		
		this.lazyLoader = new STF.LazyLoader( this.$page, this.imgToLazyloadClassName, this.lazyloadParentEl, 1, true );
	};
	
	
	AbstractPageView.prototype.initTl = function() {
		/* Show page */
		this.tl.showPage = new TimelineLite( {
			paused:		true,
			onComplete:	this.onPageShown.bind( this )
		} );
		this.tl.showPage.to( this.$page, 0.8, { opacity:1, ease:Quad.easeOut } );
		
		/* Hide page */
		this.tl.hidePage = new TimelineLite( {
			paused:		true,
			onComplete:	this.onPageHidden.bind( this )
		} );
		this.tl.hidePage.to( this.$page, 0.8, { opacity:0, ease:Quad.easeOut } );
	};
	
	
	AbstractPageView.prototype.show = function() {
		// if ( STF.PagesController.isFirstLoad )
		// 	this.tl.showPage.progress(1);
			
		// else
			this.tl.showPage.play(0);
	};
	
	
	AbstractPageView.prototype.hide = function() {
		this.tl.hidePage.play(0);
	};
	
	
	AbstractPageView.prototype.destroy = function() {
		STF.AbstractView.prototype.destroy.call( this );
		
		if ( this.lazyLoader !== undefined )
			this.lazyLoader.destroy();
	};
	
	
	AbstractPageView.prototype.onPageShown = function() {
		this.dispatch( this.E.SHOWN );
	};
	
	
	AbstractPageView.prototype.onPageHidden = function() {
		this.dispatch( this.E.HIDDEN );
	};
	
	
	return AbstractPageView;
	
	
} ) ( window );

