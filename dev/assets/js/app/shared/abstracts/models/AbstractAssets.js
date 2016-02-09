

STF.AbstractAssets = ( function( window ) {
	'use strict';
	
	
	function AbstractAssets() {
		this.aImg		= {};
		this.aJson		= {};
		this.jsonData	= {};
	}
	
	
	AbstractAssets.prototype.init = function() {
		
	};
	
	
	AbstractAssets.prototype.getAllStaticAssetsListIds = function() {
		var aIds = [];
		
		for ( var id in this.aImg )
			aIds.push( id );
		
		for ( id in this.aJson )
			if( aIds.indexOf( id ) < 0 )
				aIds.push( id );
		
		
		return aIds;
	};
	
	
	AbstractAssets.prototype.getAssetsToLoad = function( aImgListIds, aJsonListIds, dynamicImgList ) {
		var aAssetsToLoad	= [];
		
		aAssetsToLoad		= _addImgToLoad.call( this, aAssetsToLoad, aImgListIds, dynamicImgList );
		aAssetsToLoad		= _addJsonToLoad.call( this, aAssetsToLoad, aJsonListIds );
		
		return aAssetsToLoad;
	};
	
	
	var _addImgToLoad = function( aAssetsToLoad, aImgListIds, dynamicImgList ) {
		var imgList;
		
		// static images
		for ( var i = 0; i < aImgListIds.length; i++ ) {
			imgList = this.aImg[ aImgListIds[ i ] ];
			
			if ( imgList !== undefined ) {
				
				for ( var j = 0; j < imgList.length; j++ )
					aAssetsToLoad.push( imgList[ j ] );
				
			}
		}
		
		// dynamic images
		if ( dynamicImgList !== null ) {
			for ( i = 0; i < dynamicImgList.length; i++ )
				aAssetsToLoad.push( dynamicImgList[ i ].src );
		}
		
		
		return aAssetsToLoad;
	};
	
	
	var _addJsonToLoad = function( aAssetsToLoad, aJsonListIds ) {
		var jsonList;
		
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
		
		
		return aAssetsToLoad;
	};
	
	
	AbstractAssets.prototype.setJsonData = function( id, data ) {
		this.jsonData[ id ] = data;
	};
	
	
	return AbstractAssets;
	
	
} ) ( window );

