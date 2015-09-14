

APP.Views			= APP.Views || {};
APP.Views.Statics	= APP.Views.Statics || {};


APP.Views.Statics.MainLoaderView = ( function( window ) {
	
	
	function MainLoaderView() {
		APP.AbstractView.call( this );
		
		this.E = {
			PROGRESS:	'progress',
			COMPLETE:	'complete',
			SHOWN:		'shown',
			HIDDEN:		'hidden'
		};
	}
	
	
	MainLoaderView.prototype				= Object.create( APP.AbstractView.prototype );
	MainLoaderView.prototype.constructor	= MainLoaderView;
	
	
	MainLoaderView.prototype.init = function() {
		APP.AbstractView.prototype.init.call( this );
		
		_instanceAssetsLoader.call( this );
	};
	
	
	MainLoaderView.prototype.initDOM = function() {
		this.$mainLoader	= $( document.getElementById( 'main-loader' ) );
		this.$percentage	= this.$mainLoader.find( '.main-loader-percentage' );
		this.$progress		= this.$mainLoader.find( '.main-loader-progress' );
	};
	
	
	MainLoaderView.prototype.initTl = function() {
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
		
		this.assetsLoader.buildEvt( this.assetsLoader.E.PROGRESS, _onProgress.bind( this ) );
		this.assetsLoader.buildEvt( this.assetsLoader.E.COMPLETE, _onComplete.bind( this ) );
	};
	
	
	MainLoaderView.prototype.loadAssets = function( aImgsToLoad ) {
		console.log( aImgsToLoad );
		this.assetsLoader.startLoad( aImgsToLoad );
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
	
	
	MainLoaderView.prototype.hideInit = function() {
		this.tl.hideInit.play();
	};
	
	
	MainLoaderView.prototype.show = function() {
		this.tl.show.play();
	};
	
	
	MainLoaderView.prototype.hide = function() {
		this.tl.hide.play();
	};
	
	
	return MainLoaderView;
	
	
} ) ( window );

