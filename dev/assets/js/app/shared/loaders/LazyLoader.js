

STF.LazyLoader = ( function( window ) {
	'use strict';
	
	
	function LazyLoader( $page ) {
		STF.EventDispatcher.call( this );
		
		this.$page			= $page;
		
		this.NB_IMG_TO_LOAD	= 1;
		this.posLoadedImg	= 0;
		this.imgToLazyload	= [];
		this.loaderImg		= null;
		
		this.init();
	}
	
	
	LazyLoader.prototype				= Object.create( STF.EventDispatcher.prototype );
	LazyLoader.prototype.constructor	= LazyLoader;
	
	
	LazyLoader.prototype.init = function() {
		_initDOM.call( this );
		_initEl.call( this );
		_bindEvents.call( this );
		
		this.startLazyload.call( this );
	};
	
	
	var _initDOM = function() {
		this.$imgToLazyload	= this.$page.find( 'img.' + STF.PagesController.IMG_TO_LAZYLOAD );
	};
	
	
	var _initEl = function() {
		this.loaderImg = new STF.Loader( false, true );
		
		var src;
		
		for ( var i = 0; i < this.$imgToLazyload.length; i++ ) {
			src = this.$imgToLazyload[ i ].getAttribute( 'data-src' );
			
			if ( this.imgToLazyload.indexOf( src ) < 0 )
				this.imgToLazyload.push( src );
		}
	};
	
	
	var _bindEvents = function() {
		this.loaderImg.buildEvt( this.loaderImg.E.FILE_LOAD, this.onImgLoad.bind( this ) );
		this.loaderImg.buildEvt( this.loaderImg.E.COMPLETE, this.onImgLoadingComplete.bind( this ) );
	};
	
	
	var _unbindEvents = function() {
		this.loaderImg.destroyEvt( this.loaderImg.E.FILE_LOAD, this.onImgLoad.bind( this ) );
		this.loaderImg.destroyEvt( this.loaderImg.E.COMPLETE, this.onImgLoadingComplete.bind( this ) );
	};
	
	
	LazyLoader.prototype.destroy = function() {
		_unbindEvents.call( this );
		
		this.loaderImg.destroy();
	};
	
	
	LazyLoader.prototype.startLazyload = function() {
		var imgToLazyload = this.imgToLazyload.slice( this.posLoadedImg, this.posLoadedImg + this.NB_IMG_TO_LOAD );
		
		setTimeout( function() {
			this.loaderImg.startLoad( imgToLazyload );
		}.bind( this ), 1000 );
	};
	
	
	LazyLoader.prototype.onImgLoad = function( e ) {
		var $imgs = this.$imgToLazyload.filter( '[ data-src="' + e.item.src + '" ]' );
		
		for ( var i = 0; i < $imgs.length; i++ ) {
			$imgs[ i ].src = e.item.src;
			$imgs[ i ].offsetHeight; // jshint ignore:line
		}
	};
	
	
	LazyLoader.prototype.onImgLoadingComplete = function() {
		this.posLoadedImg += this.NB_IMG_TO_LOAD;
		
		if ( this.posLoadedImg < this.imgToLazyload.length )
			this.startLazyload.call( this );
		else
			this.onLazyloadCompleted.call( this );
	};
	
	
	LazyLoader.prototype.onLazyloadCompleted = function() {
		// console.log( '_onLazyloadCompleted:', this.$page[0].getAttribute( 'data-id' ) );
	};
	
	
	return LazyLoader;
	
	
} ) ( window );

