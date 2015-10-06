

STF.Models = STF.Models || {};


STF.Models.Assets = ( function( window ) {
	'use strict';
	
	
	function Assets() {
		this.aImg		= {};
		this.aJson		= {};
		this.jsonData	= {};
	}
	
	
	Assets.prototype.init = function() {
		this.aImg = {
			'global': [
				/* bgs */
				STF.Path.URL.img + 'bgs/pattern-black-transparent.png',
				
				/* btns */
				
				/* icons */
				
				/* logos */
				STF.Path.URL.img + 'logos/browsers/browser-chrome.png',
				STF.Path.URL.img + 'logos/browsers/browser-firefox.png',
				STF.Path.URL.img + 'logos/browsers/browser-internet-explorer.png',
				STF.Path.URL.img + 'logos/browsers/browser-opera.png',
				STF.Path.URL.img + 'logos/browsers/browser-safari.png',
				
				/* others */
			],
			
			'error404': [
				/* temp */
				STF.Path.URL.img + 'temp/404.jpg',
			],
			
			'home': [
				/* temp */
				STF.Path.URL.img + 'temp/home.jpg',
			],
			
			'about': [
				/* temp */
				STF.Path.URL.img + 'temp/about-1.jpg',
				STF.Path.URL.img + 'temp/about-2.jpg',
			],
			
			'projects': [
				/* temp */
				STF.Path.URL.img + 'temp/projects.jpg',
			]
		};
		
		
		this.aJson = {
			'global': {
				global: STF.Path.URL.json + 'test-global.json'
			},
			
			'home': {
				home: STF.Path.URL.json + 'test-home.json'
			},
			
			'projects': {
				projects: STF.Path.URL.json + 'test-projects.json'
			}
		};
	};
	
	
	Assets.prototype.getAllStaticAssetsListIds = function() {
		var aIds = [];
		
		for ( var id in this.aImg )
			aIds.push( id );
		
		for ( id in this.aJson )
			if( aIds.indexOf( id ) < 0 )
				aIds.push( id );
		
		
		return aIds;
	};
	
	
	Assets.prototype.getAssetsToLoad = function( aImgListIds, aJsonListIds, dynamicImgList ) {
		var aAssetsToLoad	= [];
		
		aAssetsToLoad		= _addImgToLoad.call( this, aAssetsToLoad, aImgListIds, dynamicImgList );
		aAssetsToLoad		= _addJsonToLoad.call( this, aAssetsToLoad, aJsonListIds );
		
		return aAssetsToLoad;
	};
	
	
	var _addImgToLoad = function( aAssetsToLoad, aImgListIds, dynamicImgList ) {
		var imgList;
		
		// static images
		for ( var i = 0; i < aImgListIds.length; i++ ) {
			imgList = this.aImg[ aImgListIds[i] ];
			
			if ( imgList !== undefined ) {
				
				for ( var j = 0; j < imgList.length; j++ )
					aAssetsToLoad.push( imgList[j] );
				
			}
		}
		
		// dynamic images
		if ( dynamicImgList !== null ) {
			for ( i = 0; i < dynamicImgList.length; i++ )
				aAssetsToLoad.push( dynamicImgList[i].src );
		}
		
		
		return aAssetsToLoad;
	};
	
	
	var _addJsonToLoad = function( aAssetsToLoad, aJsonListIds ) {
		var jsonList;
		
		for ( var i = 0; i < aJsonListIds.length; i++ ) {
			jsonList = this.aJson[ aJsonListIds[i] ];
			
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
	
	
	Assets.prototype.setJsonData = function( id, data ) {
		this.jsonData[ id ] = data;
	};
	
	
	return new Assets();
	
	
} ) ( window );

