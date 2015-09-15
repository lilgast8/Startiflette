

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
	
	
	AssetsModel.prototype.getAllStaticImgsListIds = function() {
		var aIds = [];
		
		for ( var id in this.aImgs )
			aIds.push( id );
		
		
		return aIds;
	};
	
	
	AssetsModel.prototype.getImgsToLoad = function( aImgsListIds, dynamicImgsList ) {
		var aImgsToLoad = [];
		var imgsList;
		
		for ( var i = 0; i < aImgsListIds.length; i++ ) {
			imgsList = this.aImgs[ aImgsListIds[i] ];
			
			if ( imgsList !== undefined ) {
				
				for ( var j = 0; j < imgsList.length; j++ )
					aImgsToLoad.push( imgsList[j] );
				
			}
		}
		
		
		// add dynamic images
		if ( dynamicImgsList !== null ) {
			console.log( 'ASDSADS' );
			
			for ( i = 0; i < dynamicImgsList.length; i++ )
				aImgsToLoad.push( dynamicImgsList[i].src );
		}
		
		
		return aImgsToLoad;
	};
	
	
	return AssetsModel;
	
	
} ) ( window );

