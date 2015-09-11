

APP.Views			= APP.Views || {};
APP.Views.Statics	= APP.Views.Statics || {};


APP.Views.Statics.MainLoaderController = ( function( window ) {
	
	
	function MainLoaderController() {
		APP.AbstractController.call(this);
		
		this.E = {
			PROGRESS:	'progress',
			COMPLETE:	'complete'
		};
		
		this.aImgs = {
			'global': [
				/* bgs */
				APP.Path.URL.img + '/bgs/pattern_black_transparent.png',
				
				/* btns */
				
				/* icons */
				
				/* logos */
				APP.Path.URL.img + '/logos/browsers/browser_chrome.png',
				APP.Path.URL.img + '/logos/browsers/browser_firefox.png',
				APP.Path.URL.img + '/logos/browsers/browser_internet_explorer.png',
				APP.Path.URL.img + '/logos/browsers/browser_opera.png',
				APP.Path.URL.img + '/logos/browsers/browser_safari.png'
				
				/* others */
			]
		};
	}
	
	
	MainLoaderController.prototype				= Object.create( APP.AbstractController.prototype );
	MainLoaderController.prototype.constructor	= MainLoaderController;
	
	
	MainLoaderController.prototype.init = function() {
		// console.log('MainLoaderController.init()', this);
		
		this.instanceView();
		
		_instanceAssetsLoader.call( this );
	};
	
	
	MainLoaderController.prototype.instanceView = function() {
		this.view = new APP.Views.Statics.MainLoaderView();
		this.view.init();
		
		console.log(this.view);
	};
	
	
	var _instanceAssetsLoader = function() {
		this.assetsLoader = new APP.Loader( true );
		this.assetsLoader.init();
		
		// this.assetsLoader.buildEvt( this.assetsLoader.E.PROGRESS, _onProgress.bind( this ) );
		this.assetsLoader.buildEvt( this.assetsLoader.E.PROGRESS, this.view.progress.bind( this.view ) );
		this.assetsLoader.buildEvt( this.assetsLoader.E.COMPLETE, _onComplete.bind( this ) );
	};
	
	
	MainLoaderController.prototype.loadAssets = function( aAssets ) {
		// console.log('pageId:', aAssets );
		
		var aImgsToLoad = _getImgs.call( this, aAssets );
		
		this.assetsLoader.startLoad( aImgsToLoad );
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
	
	
	var _onComplete = function() {
		_destroyAssetsLoader.call( this );
		
		this.dispatch( this.E.COMPLETE, this.data );
	};
	
	
	var _destroyAssetsLoader = function() {
		this.assetsLoader.destroyEvt( this.assetsLoader.E.PROGRESS, this.view.progress.bind( this.view ) );
		this.assetsLoader.destroyEvt( this.assetsLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.assetsLoader.destroy();
		this.assetsLoader = null;
	};
	
	
	MainLoaderController.prototype.hideInit = function() {
		
		
		this.view.showViewInit();
	};
	
	
	return MainLoaderController;
	
	
} ) ( window );

