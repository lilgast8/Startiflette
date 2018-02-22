

STF.Abstracts.AbstractAssets = class AbstractAssets {
	
	
	constructor() {
		this.aImg		= {};
		this.aJson		= {};
		this.jsonData	= {};
	}
	
	
	init() {
		
	}
	
	
	getAssetsToLoad( pageId, isFirstLoad, loadingMode ) {
		const aListIds		= this._getAssetsListIds( pageId, isFirstLoad, loadingMode );
		
		let aAssetsToLoad	= [];
		aAssetsToLoad		= this._addStaticAssetsToLoad( 'img', aAssetsToLoad, aListIds );
		aAssetsToLoad		= this._addStaticAssetsToLoad( 'json', aAssetsToLoad, aListIds );
		
		if ( loadingMode == 'byPageDynamic' )
			aAssetsToLoad	= this._addDynamicAssetsToLoad( isFirstLoad, aAssetsToLoad );
		
		
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
		
		for ( const id in this.aJson )
			if( aIds.indexOf( id ) < 0 )
				aIds.push( id );
		
		
		return aIds;
	}
	
	
	_addStaticAssetsToLoad( type, aAssetsToLoad, aListIds ) {
		let assetsList;
		const aAssets = type == 'img' ? this.aImg : this.aJson;
		
		for ( let i = 0; i < aListIds.length; i++ ) {
			assetsList = aAssets[ aListIds[ i ] ];
			
			if ( assetsList !== undefined )
				for ( const id in assetsList ) {
					const fileId = STF_gl_getType( assetsList ) === 'object' ? id : null;
					
					this._addAsset( aAssetsToLoad, fileId, assetsList[ id ] );
				}
		}
		
		
		return aAssetsToLoad;
	}
	
	
	_addDynamicAssetsToLoad( isFirstLoad, aAssetsToLoad ) {
		const $dynamicImgs = isFirstLoad ? STF.Core.Main.$mainCont.find( STF.Core.PagesController.DYNAMIC_IMG_TO_LOAD ) :
										   STF.Core.Main.$pageCont.find( STF.Core.PagesController.DYNAMIC_IMG_TO_LOAD );
		
		for ( let i = 0; i < $dynamicImgs.length; i++ )
			if ( $dynamicImgs[ i ].getAttribute( 'data-lazyload' ) != 'true' )
				this._addAsset( aAssetsToLoad, null, $dynamicImgs[ i ].getAttribute( 'data-src' ) );
		
		
		return aAssetsToLoad;
	}
	
	
	_addAsset( aAssetsToLoad, id, assetUrl ) {
		if ( aAssetsToLoad.indexOf( assetUrl ) < 0 && id === null )
			return aAssetsToLoad.push( assetUrl );
		else if ( aAssetsToLoad.indexOf( assetUrl ) < 0 && id !== null )
			return aAssetsToLoad.push( {
				id:		id,
				src:	assetUrl
			} );
		else if ( !STF.Configs.Config.IS_PROD )
			console.warn( 'AbstractAssets:' + assetUrl + ' already added to the loading assets list!' );
	}
	
	
	setJsonData( id, data ) {
		this.jsonData[ id ] = data;
	}
	
	
};

