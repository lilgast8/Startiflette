

STF.Models = STF.Models || {};


STF.Models.Assets = ( function( window ) {


class Assets extends STF.AbstractAssets {
	
	
	constructor() {
		super();
	}
	
	
	init() {
		this.aImg = {
			'global': [
				/* bgs */
				
				/* btns */
				
				/* icons */
				
				/* logos */
				
				/* others */
			],
			
			'error-404': [
				/* temp */
				STF.Path.URL.img + 'temp/404.jpg',
			],
			
			'not-available': [
				/* temp */
				STF.Path.URL.img + 'temp/not-available.gif',
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
	}
	
	
}


return new Assets();


} ) ( window );

