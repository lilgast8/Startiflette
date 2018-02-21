

STF.AbstractMainLoader = ( function( window ) {


class AbstractMainLoader extends STF.AbstractView {
	
	
	constructor() {
		super();
		
		this.E = {
			PROGRESS:	'progress',
			FILE_LOAD:	'fileLoad',
			COMPLETE:	'complete',
			SHOWN:		'shown',
			HIDDEN:		'hidden'
		};
	}
	
	
	init() {
		super.init();
		
		this._instanceAssetsLoader();
	}
	
	
	initDOM() {
		
	}
	
	
	initTl() {
		
	}
	
	
	resize() {
		super.resize();
	}
	
	
	_instanceAssetsLoader() {
		this.assetsLoader = new STF.Loader( true, true );
		this.assetsLoader.init();
		
		this.assetsLoader.bind( this.assetsLoader.E.PROGRESS, this.onProgress, this );
		this.assetsLoader.bind( this.assetsLoader.E.FILE_LOAD, this._onFileLoad, this );
		this.assetsLoader.bind( this.assetsLoader.E.COMPLETE, this._onComplete, this );
	}
	
	
	loadAssets( aAssetsToLoad ) {
		// console.log( aAssetsToLoad );
		
		this.assetsLoader.startLoad( aAssetsToLoad );
	}
	
	
	onProgress( percentage ) {
		
	}
	
	
	_onFileLoad( e ) {
		this.dispatch( this.E.FILE_LOAD, e );
	}
	
	
	_onComplete( data ) {
		this.dispatch( this.E.COMPLETE, data );
	}
	
	
}


return AbstractMainLoader;


} ) ( window );

