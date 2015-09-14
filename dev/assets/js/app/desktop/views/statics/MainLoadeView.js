

APP.Views			= APP.Views || {};
APP.Views.Statics	= APP.Views.Statics || {};


APP.Views.Statics.MainLoader = ( function( window ) {
	
	
	function MainLoader() {
		APP.AbstractView.call( this );
		
		this.E		= {
			PROGRESS:	'progress',
			COMPLETE:	'complete',
			SHOWN:		'shown',
			HIDDEN:		'hidden'
		};
		
		this.LOADING_MODE	= 'allStatic'; // can be allStatic, byPageStatic, byPageDynamic
		
		this.aImgs	= {
			'global': [
				/* bgs */
				APP.Path.URL.img + 'bgs/pattern_black_transparent.png',
				
				/* btns */
				
				/* icons */
				
				/* logos */
				APP.Path.URL.img + 'logos/browsers/browser_chrome.png',
				APP.Path.URL.img + 'logos/browsers/browser_firefox.png',
				APP.Path.URL.img + 'logos/browsers/browser_internet_explorer.png',
				APP.Path.URL.img + 'logos/browsers/browser_opera.png',
				APP.Path.URL.img + 'logos/browsers/browser_safari.png',
				
				/* others */
			],
			
			'error404': [
				/* others */
				APP.Path.URL.img + 'others/404.jpg',
			],
			
			'home': [
				/* others */
				APP.Path.URL.img + 'others/404.jpg',
			]
		};
	}
	
	
	MainLoader.prototype				= Object.create( APP.AbstractView.prototype );
	MainLoader.prototype.constructor	= MainLoader;
	
	
	MainLoader.prototype.init = function() {
		APP.AbstractView.prototype.init.call( this );
		
		_instanceAssetsLoader.call( this );
	};
	
	
	MainLoader.prototype.initDOM = function() {
		this.$mainLoader	= $( document.getElementById( 'main-loader' ) );
		this.$percentage	= this.$mainLoader.find( '.main-loader-percentage' );
		this.$progress		= this.$mainLoader.find( '.main-loader-progress' );
	};
	
	
	MainLoader.prototype.initTl = function() {
		/* Hide init */
		this.tl.hideInit = new TimelineLite( { paused:true, onComplete:function(){
			this.dispatch( this.E.HIDDEN );
		}.bind(this) } );
		
		this.tl.hideInit.to( this.$mainLoader, 1.5, { xPercent:100, ease:Quart.easeInOut }, 0 );
		this.tl.hideInit.to( this.$percentage, 1.5, { xPercent:-100, ease:Quart.easeInOut }, 0 );
		
		
		/* Show */
		this.tl.show = new TimelineLite( { paused:true, onComplete:function(){
			this.dispatch( this.E.SHOWN );
		}.bind(this) } );
		
		this.tl.show.to( this.$mainLoader, 1.5, { xPercent:0, ease:Quart.easeInOut }, 0 );
		this.tl.show.to( this.$percentage, 1.5, { xPercent:0, ease:Quart.easeInOut }, 0 );
	};
	
	
	var _instanceAssetsLoader = function() {
		this.assetsLoader = new APP.Loader( true );
		this.assetsLoader.init();
		
		// this.assetsLoader.buildEvt( this.assetsLoader.E.PROGRESS, _onProgress.bind( this ) );
		this.assetsLoader.buildEvt( this.assetsLoader.E.PROGRESS, _onProgress.bind( this ) );
		this.assetsLoader.buildEvt( this.assetsLoader.E.COMPLETE, _onComplete.bind( this ) );
	};
	
	
	// MainLoader.prototype.loadAssets = function( aAssets ) {
	MainLoader.prototype.loadAssets = function( isInit, pageId ) {
		console.log('MainLoader.loadAssets():', isInit, pageId );
		
		var aIds		= _getIds.call( this, isInit, pageId );
		var aImgsToLoad	= _getImgs.call( this, aIds );
		
		this.assetsLoader.startLoad( aImgsToLoad );
	};
	
	
	var _getIds = function( isInit, pageId ) {
		var aIds = [];
		
		/* Init */
		if ( isInit && this.LOADING_MODE == 'allStatic')
			aIds = _getAllStaticIds.call( this );
		else if ( isInit && this.LOADING_MODE == 'byPageStatic')
			aIds = [ 'global', pageId ];
		else if ( isInit && this.LOADING_MODE == 'byPageDynamic')
			aIds = [ 'global', pageId ];
		
		/* Change page */
		// else if ( !isInit && this.LOADING_MODE == 'allStatic')
		// 	aIds = [ ];
		// else if ( !isInit && this.LOADING_MODE == 'byPageStatic')
		// 	aIds = [ this.page.id ];
		// else if ( !isInit && this.LOADING_MODE == 'byPageDynamic')
		// 	aIds = [ this.page.id ];
		
		return aIds;
	};
	
	
	var _getAllStaticIds = function() {
		var aIds = [];
		
		for ( var name in this.aImgs )
			aIds.push( name );
		
		return aIds;
	};
	
	
	var _getImgs = function( aAssets ) {
		var aImgs	= [];
		var imgList;
		
		for ( var i = 0; i < aAssets.length; i++ ) {
			imgList = this.aImgs[ aAssets[i] ];
			
			if ( imgList !== undefined ) {
				
				for ( var j = 0; j < imgList.length; j++ )
					aImgs.push( imgList[j] );
				
			}
		}
		
		return aImgs;
	};
	
	
	var _onProgress = function( percentage ) {
		var posX = percentage - 100;
		
		this.$percentage[0].innerHTML = parseInt( percentage ) + '%';
		this.$progress[0].style[ APP.Config.TRANSFORM ] = 'translate(' + posX + '%, 0%)';
	};
	
	
	var _onComplete = function() {
		_destroyAssetsLoader.call( this );
		
		this.dispatch( this.E.COMPLETE, this.data );
	};
	
	
	var _destroyAssetsLoader = function() {
		this.assetsLoader.destroyEvt( this.assetsLoader.E.PROGRESS, _onProgress.bind( this ) );
		this.assetsLoader.destroyEvt( this.assetsLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.assetsLoader.destroy();
		this.assetsLoader = null;
	};
	
	
	MainLoader.prototype.hideInit = function() {
		this.tl.hideInit.play();
	};
	
	
	MainLoader.prototype.show = function() {
		this.tl.show.play();
	};
	
	
	MainLoader.prototype.hide = function() {
		this.tl.hide.play();
	};
	
	
	return MainLoader;
	
	
} ) ( window );

