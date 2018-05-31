

STF.Abstracts.AbstractAssets = class AbstractAssets {
	
	
	constructor() {
		this.aImg		= {};
		this.aTxt		= {};
		this.aSounds	= {};
		this.json		= {};
		this.shader		= {};
	}
	
	
	init() {
		
	}
	
	
	getAssetsToLoad( pageId, isFirstLoad, loadingMode ) {
		const aListIds		= this._getAssetsListIds( pageId, isFirstLoad, loadingMode );
		
		let aAssetsToLoad	= [];
		aAssetsToLoad		= this._addStaticAssetsToLoad( this.aImg, aAssetsToLoad, aListIds );
		aAssetsToLoad		= this._addStaticAssetsToLoad( this.aTxt, aAssetsToLoad, aListIds );
		aAssetsToLoad		= this._addStaticAssetsToLoad( this.aSounds, aAssetsToLoad, aListIds );
		
		if ( loadingMode == 'byPageDynamic' )
			aAssetsToLoad	= this._addDynamicAssetsToLoad( pageId, isFirstLoad, aAssetsToLoad );
		
		
		return aAssetsToLoad;
	}
	
	
	_getAssetsListIds( pageId, isFirstLoad, loadingMode ) {
		let aIds = [];
		
		
		// first load
		if ( isFirstLoad && loadingMode == 'allStatic')
			aIds = this._getAllStaticAssetsListIds();
		
		else if ( isFirstLoad && loadingMode == 'byPageStatic' ||
				  isFirstLoad && loadingMode == 'byPageDynamic' )
			aIds = [ 'global', pageId ];
		
		
		// page change load
		else if ( !isFirstLoad && loadingMode == 'byPageStatic' ||
				  !isFirstLoad && loadingMode == 'byPageDynamic' )
			aIds = [ pageId ];
		
		
		return aIds;
	}
	
	
	_getAllStaticAssetsListIds() {
		let aIds = [];
		
		for ( const id in this.aImg )
			aIds.push( id );
		
		for ( const id in this.aTxt )
			if( aIds.indexOf( id ) < 0 )
				aIds.push( id );
		
		for ( const id in this.aSounds )
			if( aIds.indexOf( id ) < 0 )
				aIds.push( id );
		
		
		return aIds;
	}
	
	
	_addStaticAssetsToLoad( aAssets, aAssetsToLoad, aListIds ) {
		for ( const pageId in aAssets ) {
			const aAssetsByPage = aAssets[ pageId ];
			
			if ( aListIds.indexOf( pageId ) >= 0 )
				for ( const id in aAssetsByPage )
					this._addAsset( aAssetsToLoad, aAssetsByPage[ id ], id, pageId );
		}
		
		
		return aAssetsToLoad;
	}
	
	
	_getAssetObj( src, id, pageId ) {
		return {
			src,
			id,
			pageId
		};
	}
	
	
	_addDynamicAssetsToLoad( pageId, isFirstLoad, aAssetsToLoad ) {
		const $dynamicImgs = isFirstLoad ? STF.Controllers.Main.$mainCont.find( STF.Controllers.PagesController.DYNAMIC_IMG_TO_LOAD ) :
										   STF.Controllers.Main.$pageCont.find( STF.Controllers.PagesController.DYNAMIC_IMG_TO_LOAD );
		
		for ( let i = 0; i < $dynamicImgs.length; i++ )
			if ( $dynamicImgs[ i ].getAttribute( 'data-lazyload' ) != 'true' )
				this._addAsset( aAssetsToLoad, $dynamicImgs[ i ].getAttribute( 'data-src' ), i, pageId );
		
		
		return aAssetsToLoad;
	}
	
	
	_addAsset( aAssetsToLoad, src, id, pageId ) {
		const asset		= { src, id, pageId };
		let addAsset	= true;
		
		for ( let i = 0; i < aAssetsToLoad.length; i++ ) {
			if ( aAssetsToLoad[ i ].src == src ) {
				addAsset = false;
				
				break;
			}
		}
		
		if ( addAsset )
			aAssetsToLoad.push( asset );
	}
	
	
	setJsonData( pageId, dataId, data ) {
		if ( this.json[ pageId ] === undefined )
			this.json[ pageId ] = {};
		
		this.json[ pageId ][ dataId ] = data;
		
	}
	
	
	resetJsonData( pageId, dataId = null ) {
		if ( dataId === null )
			delete this.json[ pageId ];
		else
			delete this.json[ pageId ][ dataId ];
	}
	
	
	setTxtData( ext, pageId, dataId, data ) {
		if ( ext != 'obj' )
			this.setShaderData( pageId, dataId, data );
	}
	
	
	setShaderData( pageId, dataId, data ) {
		if ( this.shader[ pageId ] === undefined )
			this.shader[ pageId ] = {};
		
		this.shader[ pageId ][ dataId ] = data;
	}
	
	
	resetShaderData( pageId, dataId = null ) {
		if ( dataId === null )
			delete this.shader[ pageId ];
		else
			delete this.shader[ pageId ][ dataId ];
	}
	
	
};

