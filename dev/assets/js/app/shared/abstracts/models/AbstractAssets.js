

STF.AbstractAssets = ( function( window ) {
	'use strict';
	
	
	function AbstractAssets() {
		this.aImg		= {};
		this.aJson		= {};
		this.jsonData	= {};
	}
	
	
	AbstractAssets.prototype.init = function() {
		
	};
	
	
	AbstractAssets.prototype.getAssetsToLoad = function( pageId, isFirstLoad, loadingMode ) {
		var aListIds		= _getAssetsListIds.call( this, pageId, isFirstLoad, loadingMode );
		
		var aAssetsToLoad	= [];
		aAssetsToLoad		= _addStaticAssetsToLoad.call( this, 'img', aAssetsToLoad, aListIds );
		aAssetsToLoad		= _addStaticAssetsToLoad.call( this, 'json', aAssetsToLoad, aListIds );
		
		if ( loadingMode == 'byPageDynamic' )
			aAssetsToLoad	= _addDynamicAssetsToLoad.call( this, isFirstLoad, aAssetsToLoad );
		
		
		return aAssetsToLoad;
	};
	
	
	var _getAssetsListIds = function( pageId, isFirstLoad, loadingMode ) {
		var aIds = [];
		
		
		// first load
		if ( isFirstLoad && loadingMode == 'allStatic')
			aIds = _getAllStaticAssetsListIds.call( this );
		
		else if ( isFirstLoad && loadingMode == 'byPageStatic' ||
				  isFirstLoad && loadingMode == 'byPageDynamic' )
			aIds = [ 'global', pageId ];
		
		
		// page change load
		else if ( !isFirstLoad && loadingMode == 'byPageStatic' ||
				  !isFirstLoad && loadingMode == 'byPageDynamic' )
			aIds = [ pageId ];
		
		
		return aIds;
	};
	
	
	var _getAllStaticAssetsListIds = function() {
		var aIds = [];
		
		for ( var id in this.aImg )
			aIds.push( id );
		
		for ( id in this.aJson )
			if( aIds.indexOf( id ) < 0 )
				aIds.push( id );
		
		
		return aIds;
	};
	
	
	var _addStaticAssetsToLoad = function( type, aAssetsToLoad, aListIds ) {
		var assetsList;
		var aAssets = type == 'img' ? this.aImg : this.aJson;
		
		for ( var i = 0; i < aListIds.length; i++ ) {
			assetsList = aAssets[ aListIds[ i ] ];
			
			var fileId;
			
			// console.log( assetsList, assetsList.constructor.name );
			// console.log( Object.prototype.toString.call( assetsList ) );
			if ( assetsList !== undefined )
				for ( var id in assetsList ) {
					// console.log( typeof assetsList );
					// console.log( assetsList.toString() );
					// console.log( assetsList.toType() );
					// console.log( Object.toType( assetsList ) );
					// console.log( getType( assetsList ) );
					// console.log( assetsList.STF_toType() );
					// console.log( Object.prototype.toString.call( assetsList ) );
					// console.log( Array.isArray( assetsList ) );
					// console.log( assetsList.constructor.name );
					// fileId = type == 'img' ? null : id;
					// fileId = assetsList.constructor.name == 'Object' ? id : null;
					fileId = getType( assetsList ) === 'object' ? id : null;
					// console.log( fileId );
					
					_addAsset.call( this, aAssetsToLoad, fileId, assetsList[ id ] );
				}
		}
		
		
		/*
		for ( var i = 0; i < aJsonListIds.length; i++ ) {
			jsonList = this.aJson[ aJsonListIds[ i ] ];
			
			if ( jsonList !== undefined ) {
				
				for ( var id in jsonList ) {
					
					aAssetsToLoad.push( {
						id:		id,
						src:	jsonList[ id ]
					} );
					
				}
				
			}
		}
		*/
		
		
		return aAssetsToLoad;
	};
	
	
	var _addDynamicAssetsToLoad = function( isFirstLoad, aAssetsToLoad ) {
		var $dynamicImgs = isFirstLoad ? STF.MainView.$pageCont.find( STF.PagesController.DYNAMIC_IMG_TO_LOAD ) :
										 $( STF.PagesController.data ).find( STF.PagesController.DYNAMIC_IMG_TO_LOAD );
		
		for ( var i = 0; i < $dynamicImgs.length; i++ )
			_addAsset.call( this, aAssetsToLoad, null, $dynamicImgs[ i ].src );
		
		
		return aAssetsToLoad;
	};
	
	
	var _addAsset = function( aAssetsToLoad, id, assetUrl ) {
		if ( aAssetsToLoad.indexOf( assetUrl ) < 0 && id === null )
			return aAssetsToLoad.push( assetUrl );
		else if ( aAssetsToLoad.indexOf( assetUrl ) < 0 && id !== null )
			return aAssetsToLoad.push( {
				id:		id,
				src:	assetUrl
			} );
		else if ( STF.Config.ENV != 'prod' )
			console.log( assetUrl + ' already added to the loading assets list!' );
	};
	
	
	AbstractAssets.prototype.setJsonData = function( id, data ) {
		this.jsonData[ id ] = data;
	};
	
	
	return AbstractAssets;
	
	
} ) ( window );

