

STF.LazyLoader = ( function( window ) {
	'use strict';
	
	
	// function LazyLoader( isOnProgress, isOnFileLoad ) {
	function LazyLoader( $page ) {
		STF.EventDispatcher.call( this );
		
		// this.isOnProgress = isOnProgress;
		// this.isOnFileLoad = isOnFileLoad;
		
		this.E = {
			STARTED:	'started',
			PROGRESS:	'progress',
			FILE_LOAD:	'fileLoad',
			COMPLETE:	'complete',
			ERROR:		'error'
		};
		
		// this.data	= [];
		// this.queue	= null;
		
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
		// this.initDOM();
		// this.initEl();
		// this.initTl();
		// this.bindEvents();
		
		_initDOM.call( this );
		_initEl.call( this );
		_bindEvents.call( this );
	};
	
	
	var _initDOM = function() {
		this.$imgToLazyload	= this.$page.find( 'img.' + STF.PagesController.IMG_TO_LAZYLOAD );
	};
	
	
	var _initEl = function() {
		this.loaderImg = new STF.Loader( false, true );
		
		
		var $img, $parent, src;
		
		for ( var i = 0; i < this.$imgToLazyload.length; i++ ) {
			
			src = this.$imgToLazyload[ i ].getAttribute( 'data-src' );
			
			if ( this.imgToLazyload.indexOf( src ) < 0 )
				this.imgToLazyload.push( src );
			
			/*$img	= this.$imgToLazyload[ i ];
			$parent	= $( $img ).parents( 'div' );
			src		= $img.src;
			
			if ( ( !this.isSlider && src.indexOf( '/slider' ) == -1 || this.isSlider ) && !hasClass( $parent[0], 'loaded' ) ) {
				addClass( $parent[0], 'img-loading' );
				
				$img.src	= CCB.Path.URL.img + 'bgs/pattern-transparent.png'; // trick to avoid CSS bug
				$img.setAttribute( 'data-src', src );
				
				this.imgToLazyload.push( src );
			}*/
		}
		
		console.log( this.imgToLazyload );
		
		
		_startLazyload.call( this );
	};
	
	
	// var _bindLazyloadingEvents = function() {
	var _bindEvents = function() {
		this.loaderImg.buildEvt( this.loaderImg.E.FILE_LOAD, _onImgLoad.bind( this ) );
		this.loaderImg.buildEvt( this.loaderImg.E.COMPLETE, _onImgLoadingComplete.bind( this ) );
	};
	
	
	// var _unbindLazyloadingEvents = function() {
	var _unbindEvents = function() {
		this.loaderImg.destroyEvt( this.loaderImg.E.FILE_LOAD, _onImgLoad.bind( this ) );
		this.loaderImg.destroyEvt( this.loaderImg.E.COMPLETE, _onImgLoadingComplete.bind( this ) );
	};
	
	
	var _startLazyload = function() {
		var imgToLazyload = this.imgToLazyload.slice( this.posLoadedImg, this.posLoadedImg + this.NB_IMG_TO_LOAD );
		
		// setTimeout( function() {
			this.loaderImg.startLoad( imgToLazyload );
		// }.bind( this ), 3000 );
	};
	
	
	var _onImgLoad = function( e ) {
		var $imgs = this.$imgToLazyload.filter( '[ data-src="' + e.item.src + '" ]' );
		
		for ( var i = 0; i < $imgs.length; i++ )
			$imgs[ i ].src = e.item.src;
	};
	
	
	var _onImgLoadingComplete = function() {
		this.posLoadedImg += this.NB_IMG_TO_LOAD;
		
		if ( this.posLoadedImg < this.imgToLazyload.length )
			_startLazyload.call( this );
		else {
			this.stoSlider = setTimeout( function() {
				_removeLoader.call( this );
			}.bind( this ), 600 );
		}
	};
	
	
	var _removeLoader = function() {
		var $img, src, $parent;
		for ( var i = 0; i < this.$imgToLazyload.length; i++ ) {
			$img	= this.$imgToLazyload[ i ];
			$parent	= $( $img ).parents( 'div' );
			src		= $img.src;
			
			if ( !this.isSlider && src.indexOf( '/slider' ) == -1 || this.isSlider )
				removeClass( $parent[0], 'img-loading' );
		}
	};
	
	
	return LazyLoader;
	
	
} ) ( window );

