

STF.Models = STF.Models || {};


STF.Models.AssetsModel = ( function( window ) {
	
	
	function AssetsModel() {
		this.aImgs			= {
			'global': [
				/* bgs */
				STF.Path.URL.img + 'bgs/pattern_black_transparent.png',
				
				/* btns */
				
				/* icons */
				
				/* logos */
				STF.Path.URL.img + 'logos/browsers/browser_chrome.png',
				STF.Path.URL.img + 'logos/browsers/browser_firefox.png',
				STF.Path.URL.img + 'logos/browsers/browser_internet_explorer.png',
				STF.Path.URL.img + 'logos/browsers/browser_opera.png',
				STF.Path.URL.img + 'logos/browsers/browser_safari.png',
				
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
		
		// static images
		for ( var i = 0; i < aImgsListIds.length; i++ ) {
			imgsList = this.aImgs[ aImgsListIds[i] ];
			
			if ( imgsList !== undefined ) {
				
				for ( var j = 0; j < imgsList.length; j++ )
					aImgsToLoad.push( imgsList[j] );
				
			}
		}
		
		// dynamic images
		if ( dynamicImgsList !== null ) {
			for ( i = 0; i < dynamicImgsList.length; i++ )
				aImgsToLoad.push( dynamicImgsList[i].src );
		}
		
		
		return aImgsToLoad;
	};
	
	
	return AssetsModel;
	
	
} ) ( window );

