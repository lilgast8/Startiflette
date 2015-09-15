

APP.Models = APP.Models || {};


APP.Models.AssetsModel = ( function( window ) {
	
	
	function AssetsModel() {
		this.aImgs			= {
			'global': [
				/* bgs */
				APP.Path.URL.img + 'bgs/pattern_black_transparent.png',
				
				/* btns */
				
				/* icons */
				
				/* logos */
				APP.Path.URL.img + 'logos/browsers/browser_chrome.png',
				APP.Path.URL.img + 'logos/browsers/browser_firefox.png',
				APP.Path.URL.img + 'logos/browsers/browser_internet_explorer.png',
				APP.Path.URL.img + 'logos/browsers/browser_opera.png',
				APP.Path.URL.img + 'logos/browsers/browser_safari.png',
				
				/* others */
			],
			
			'error404': [
				/* temp */
				APP.Path.URL.img + 'temp/404.jpg',
			],
			
			'home': [
				/* temp */
				APP.Path.URL.img + 'temp/home.jpg',
			],
			
			'about': [
				/* temp */
				APP.Path.URL.img + 'temp/about-1.jpg',
				APP.Path.URL.img + 'temp/about-2.jpg',
			],
			
			'projects': [
				/* temp */
				APP.Path.URL.img + 'temp/projects.jpg',
			]
		};
	}
	
	
	/*AssetsModel.prototype.getAllStaticImgsListIds = function() {
		var aIds = [];
		
		for ( var id in this.aImgs )
			aIds.push( id );
		
		return aIds;
	};*/
	
	
	/*AssetsModel.prototype.getByPageDynamicImgsListIds = function() {
		var aIds = [ 'global' ];
		
		for ( var id in this.aImgs )
			aIds.push( id );
		
		return aIds;
	};*/
	
	
	/*AssetsModel.prototype.getImgsToLoad = function( aImgsListIds ) {
		var aImgs = [];
		var imgsList;
		
		for ( var i = 0; i < aImgsListIds.length; i++ ) {
			imgsList = this.aImgs[ aImgsListIds[i] ];
			
			if ( imgsList !== undefined ) {
				
				for ( var j = 0; j < imgsList.length; j++ )
					aImgs.push( imgsList[j] );
				
			}
		}
		
		return aImgs;
	};*/
	
	
	AssetsModel.prototype.getImgsToLoad = function( pageId, isFirstLoad, loadingMode, dynamicImgsList ) {
		// console.log( 'RASDASDA', data );
		// console.log( 'RASDASDA', dynamicImgsList );
		
		var aImgsListIds = _getImgsListIds.call( this, pageId, isFirstLoad, loadingMode );
		
		var aImgsToLoad = [];
		var imgsList;
		
		for ( var i = 0; i < aImgsListIds.length; i++ ) {
			imgsList = this.aImgs[ aImgsListIds[i] ];
			
			if ( imgsList !== undefined ) {
				
				for ( var j = 0; j < imgsList.length; j++ )
					aImgsToLoad.push( imgsList[j] );
				
			}
		}
		
		/*if ( isFirstLoad && loadingMode == 'byPageDynamic' ) {
			var imgs = APP.MainView.$pageCont.find( 'img' );
			
			for ( i = 0; i < imgs.length; i++ )
				aImgsToLoad.push( imgs[i].src );
		}
		else if ( !isFirstLoad && loadingMode == 'byPageDynamic' ) {
			var img = $( data ).find( 'img' );
			console.log( img.length );
		}*/
		
		// add dynamic images
		if ( dynamicImgsList !== null ) {
			console.log( 'ASDSADS' );
			
			for ( i = 0; i < dynamicImgsList.length; i++ )
				aImgsToLoad.push( dynamicImgsList[i].src );
		}
		
		
		return aImgsToLoad;
	};
	
	
	var _getImgsListIds = function( pageId, isFirstLoad, loadingMode ) {
		console.log( pageId, isFirstLoad, loadingMode );
		
		var aIds = [];
		
		/* First load */
		if ( isFirstLoad && loadingMode == 'allStatic')
			aIds = _getAllStaticImgsListIds.call( this );
		else if ( isFirstLoad && loadingMode == 'byPageStatic')
			aIds = [ 'global', pageId ];
		else if ( isFirstLoad && loadingMode == 'byPageDynamic')
			aIds = [ 'global' ];
		
		/* Page change load */
		// else if ( !isFirstLoad && loadingMode == 'allStatic')
		// 	aIds = [ ];
		else if ( !isFirstLoad && loadingMode == 'byPageStatic')
			aIds = [ this.page.id ];
		// else if ( !isFirstLoad && loadingMode == 'byPageDynamic')
		// 	aIds = [ this.page.id ];
		
		return aIds;
	};
	
	
	var _getAllStaticImgsListIds = function() {
		var aIds = [];
		
		for ( var id in this.aImgs )
			aIds.push( id );
		
		return aIds;
	};
	
	
	return AssetsModel;
	
	
} ) ( window );

