

STF.Abstracts.AbstractMainLoader = class AbstractMainLoader extends STF.Abstracts.AbstractView {
	
	
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
		this.assetsLoader = new STF.Loaders.Loader( true, true );
		this.assetsLoader.init();
		
		this.assetsLoader.bind( this.assetsLoader.E.PROGRESS, this.onProgress, this );
		this.assetsLoader.bind( this.assetsLoader.E.FILE_LOAD, this.onFileLoad, this );
		this.assetsLoader.bind( this.assetsLoader.E.COMPLETE, this.onComplete, this );
	}
	
	
	loadAssets( aAssetsToLoad ) {
		// console.log( aAssetsToLoad );
		
		this.assetsLoader.startLoad( aAssetsToLoad );
	}
	
	
	onProgress( percentage ) {
		
	}
	
	
	onFileLoad( e ) {
		this.dispatch( this.E.FILE_LOAD, e );
	}
	
	
	onComplete( data ) {
		this.dispatch( this.E.COMPLETE, data );
	}
	
	
};

