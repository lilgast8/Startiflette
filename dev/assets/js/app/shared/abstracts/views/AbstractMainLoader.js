

STF.AbstractMainLoader = ( function( window ) {
	'use strict';
	
	
	function AbstractMainLoader() {
		STF.AbstractView.call( this );
		
		this.E = {
			PROGRESS:	'progress',
			FILE_LOAD:	'fileLoad',
			COMPLETE:	'complete',
			SHOWN:		'shown',
			HIDDEN:		'hidden'
		};
	}
	
	
	AbstractMainLoader.prototype				= Object.create( STF.AbstractView.prototype );
	AbstractMainLoader.prototype.constructor	= AbstractMainLoader;
	
	
	AbstractMainLoader.prototype.init = function() {
		STF.AbstractView.prototype.init.call( this );
		
		_instanceAssetsLoader.call( this );
	};
	
	
	AbstractMainLoader.prototype.initDOM = function() {
		
	};
	
	
	AbstractMainLoader.prototype.initTl = function() {
		
	};
	
	
	var _instanceAssetsLoader = function() {
		this.assetsLoader = new STF.Loader( true, true );
		this.assetsLoader.init();
		
		this.assetsLoader.buildEvt( this.assetsLoader.E.PROGRESS, this.onProgress.bind( this ) );
		this.assetsLoader.buildEvt( this.assetsLoader.E.FILE_LOAD, _onFileLoad.bind( this ) );
		this.assetsLoader.buildEvt( this.assetsLoader.E.COMPLETE, _onComplete.bind( this ) );
	};
	
	
	AbstractMainLoader.prototype.loadAssets = function( aAssetsToLoad ) {
		// console.log( aAssetsToLoad );
		
		this.assetsLoader.startLoad( aAssetsToLoad );
	};
	
	
	AbstractMainLoader.prototype.onProgress = function( percentage ) {
		
	};
	
	
	var _onFileLoad = function( e ) {
		this.dispatch( this.E.FILE_LOAD, e );
	};
	
	
	var _onComplete = function( data ) {
		this.dispatch( this.E.COMPLETE, data );
	};
	
	
	return AbstractMainLoader;
	
	
} ) ( window );

