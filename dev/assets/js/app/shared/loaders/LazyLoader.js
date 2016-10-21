

STF.LazyLoader = ( function( window ) {
	'use strict';
	
	
	function LazyLoader( $container, className, parentEl, stackSize, autoInit ) {
		STF.CustomEvent.call( this );
		
		this.$container		= $container;
		this.CLASS_NAME		= className;
		this.PARENT_EL		= parentEl;
		this.STACK_SIZE		= stackSize; // number of images loaded at each loading wave
		
		this.posLoadedImg	= 0;
		this.imgToLazyload	= [];
		this.loaderImg		= null;
		
		if ( autoInit )
			this.init();
	}
	
	
	LazyLoader.prototype				= Object.create( STF.CustomEvent.prototype );
	LazyLoader.prototype.constructor	= LazyLoader;
	
	
	LazyLoader.prototype.init = function() {
		this.initDOM();
		this.initEl();
		this.bindEvents();
		
		this.startLazyload.call( this );
	};
	
	
	LazyLoader.prototype.initDOM = function() {
		this.$imgToLazyload	= this.$container.find( 'img.' + this.CLASS_NAME );
	};
	
	
	LazyLoader.prototype.initEl = function() {
		this.loaderImg = new STF.Loader( false, true );
		
		var src;
		
		for ( var i = 0; i < this.$imgToLazyload.length; i++ ) {
			src = this.$imgToLazyload[ i ].getAttribute( 'data-src' );
			
			if ( this.imgToLazyload.indexOf( src ) < 0 && src != 'preloaded' )
				this.imgToLazyload.push( src );
		}
	};
	
	
	LazyLoader.prototype.bindEvents = function() {
		this.loaderImg.bind( this.loaderImg.E.FILE_LOAD, this.onImgLoad, this );
		this.loaderImg.bind( this.loaderImg.E.COMPLETE, this.onImgLoadingComplete, this );
	};
	
	
	LazyLoader.prototype.unbindEvents = function() {
		this.loaderImg.unbind( this.loaderImg.E.FILE_LOAD, this.onImgLoad, this );
		this.loaderImg.unbind( this.loaderImg.E.COMPLETE, this.onImgLoadingComplete, this );
	};
	
	
	LazyLoader.prototype.destroy = function() {
		this.unbindEvents();
		
		this.loaderImg.destroy();
	};
	
	
	LazyLoader.prototype.startLazyload = function() {
		if ( this.imgToLazyload.length === 0 )
			return;
		
		
		var imgToLazyload = this.imgToLazyload.slice( this.posLoadedImg, this.posLoadedImg + this.STACK_SIZE );
		
		// setTimeout( function() {
			this.loaderImg.startLoad( imgToLazyload );
		// }.bind( this ), 1000 );
	};
	
	
	LazyLoader.prototype.onImgLoad = function( e ) {
		var $imgs = this.$imgToLazyload.filter( '[ data-src="' + e.item.src + '" ]' );
		var $img;
		
		for ( var i = 0; i < $imgs.length; i++ ) {
			$img		= $imgs[ i ];
			$img.src	= e.item.src;
			
			$img.offsetHeight; // jshint ignore:line
			$img.setAttribute( 'data-src', 'lazyloaded' );
			
			if ( this.PARENT_EL !== null )
				addClass( $( $imgs[ i ] ).parent( this.PARENT_EL )[0], 'loaded' );
		}
	};
	
	
	LazyLoader.prototype.onImgLoadingComplete = function() {
		this.posLoadedImg += this.STACK_SIZE;
		
		if ( this.posLoadedImg < this.imgToLazyload.length )
			this.startLazyload.call( this );
		else
			this.onLazyloadCompleted.call( this );
	};
	
	
	LazyLoader.prototype.onLazyloadCompleted = function() {
		// console.log( '_onLazyloadCompleted:', this.$container );
	};
	
	
	return LazyLoader;
	
	
} ) ( window );

