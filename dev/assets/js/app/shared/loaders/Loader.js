

STF.Loader = ( function( window ) {
	'use strict';
	
	
	function Loader( isOnProgress, isOnFileLoad ) {
		STF.CustomEvent.call( this );
		
		this.isOnProgress = isOnProgress;
		this.isOnFileLoad = isOnFileLoad;
		
		this.E = {
			STARTED:	'started',
			PROGRESS:	'progress',
			FILE_LOAD:	'fileLoad',
			COMPLETE:	'complete',
			ERROR:		'error'
		};
		
		this.data	= [];
		this.queue	= null;
		
		this.init();
	}
	
	
	Loader.prototype				= Object.create( STF.CustomEvent.prototype );
	Loader.prototype.constructor	= Loader;
	
	
	Loader.prototype.init = function() {
		this.queue = new createjs.LoadQueue( true );
		
		this.bindEvents();
	};
	
	
	Loader.prototype.bindEvents = function() {
		this.queue.addEventListener( 'loadstart', $.proxy( _onLoadStart, this ) );
		this.queue.addEventListener( 'progress', $.proxy( _onProgress, this ) );
		this.queue.addEventListener( 'fileload', $.proxy( _onFileLoad, this ) );
		this.queue.addEventListener( 'complete', $.proxy( _onComplete, this ) );
		this.queue.addEventListener( 'error', $.proxy( _onError, this ) );
	};
	
	
	Loader.prototype.unbindEvents = function() {
		this.queue.removeAllEventListeners();
	};
	
	
	Loader.prototype.startLoad = function( items ) {
		if ( items.length !== 0 )
			this.queue.loadManifest( items );
		else
			_onComplete.call( this, null );
	};
	
	
	Loader.prototype.destroy = function() {
		this.unbindEvents();
		
		this.queue.removeAll();
	};
	
	
	var _onLoadStart = function( e ) {
		// console.log('Loader._loadStart()');
		// this.dispatch( this.E.STARTED, e );
	};
	
	
	var _onProgress = function( e ) {
		if ( this.isOnProgress )
			this.dispatch( this.E.PROGRESS, e.progress * 100 );
	};
	
	
	var _onFileLoad = function( e ) {
		if ( this.isOnFileLoad )
			this.dispatch( this.E.FILE_LOAD, e );
		
		else
			this.data[ e.item.id ] = e.result;
	};
	
	
	var _onComplete = function( e ) {
		this.queue.removeAll();
		
		this.dispatch( this.E.COMPLETE, this.data );
	};
	
	
	var _onError = function( e ) {
		// console.log(e);
		// this.dispatch( this.E.ERROR, e );
	};
	
	
	return Loader;
	
	
} ) ( window );

