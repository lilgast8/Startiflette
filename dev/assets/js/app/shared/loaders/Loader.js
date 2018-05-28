

STF.Loaders.Loader = class Loader extends STF.Events.CustomEvent {
	
	
	constructor( isOnProgress, isOnFileLoad ) {
		super();
		
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
	
	
	init() {
		this.queue = new createjs.LoadQueue( true );
		if ( createjs.Sound )
			this.queue.installPlugin( createjs.Sound );
		
		this.bindEvents();
	}
	
	
	bindEvents() {
		this.queue.addEventListener( 'loadstart', $.proxy( this._onLoadStart, this ) );
		this.queue.addEventListener( 'progress', $.proxy( this._onProgress, this ) );
		this.queue.addEventListener( 'fileload', $.proxy( this._onFileLoad, this ) );
		this.queue.addEventListener( 'complete', $.proxy( this._onComplete, this ) );
		this.queue.addEventListener( 'error', $.proxy( this._onError, this ) );
	}
	
	
	unbindEvents() {
		this.queue.removeAllEventListeners();
	}
	
	
	startLoad( items ) {
		if ( items.length !== 0 )
			this.queue.loadManifest( items );
		else
			this._onComplete( null );
	}
	
	
	destroy() {
		this.unbindEvents();
		
		this.queue.removeAll();
	}
	
	
	_onLoadStart( e ) {
		// console.log('Loader._loadStart()');
		// this.dispatch( this.E.STARTED, e );
	}
	
	
	_onProgress( e ) {
		if ( this.isOnProgress )
			this.dispatch( this.E.PROGRESS, e.progress * 100 );
	}
	
	
	_onFileLoad( e ) {
		if ( this.isOnFileLoad )
			this.dispatch( this.E.FILE_LOAD, e );
		
		else
			this.data[ e.item.id ] = e.result;
	}
	
	
	_onComplete( e ) {
		this.queue.removeAll();
		
		this.dispatch( this.E.COMPLETE, this.data );
	}
	
	
	_onError( e ) {
		// console.log(e);
		// this.dispatch( this.E.ERROR, e );
	}
	
	
};

