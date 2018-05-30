

STF.Models.Assets = new class Assets extends STF.Abstracts.AbstractAssets {
	
	
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
				STF.Configs.Path.URL.img + 'temp/404.jpg',
			],
			
			'not-available': [
				/* temp */
				STF.Configs.Path.URL.img + 'temp/not-available.gif',
			],
			
			'home': [
				/* temp */
				STF.Configs.Path.URL.img + 'temp/home.jpg',
			],
			
			'about': [
				/* temp */
				STF.Configs.Path.URL.img + 'temp/about-1.jpg',
				STF.Configs.Path.URL.img + 'temp/about-2.jpg',
			],
			
			'projects': [
				/* temp */
				STF.Configs.Path.URL.img + 'temp/projects.jpg',
			]
		};
		
		
		this.aTxt = {
			'global': [
				// global1: STF.Configs.Path.URL.json + 'test-global.json'
				{
					pageId:	'global',
					id:		'global1',
					src:	STF.Configs.Path.URL.json + 'test-global.json'
				},
				{
					pageId:	'global',
					id:		'projects',
					src:	STF.Configs.Path.URL.json + 'test-projects.json'
				}
			],
			
			'home': {
				home1: STF.Configs.Path.URL.json + 'test-home.json',
				home2: STF.Configs.Path.URL.json + 'test-global.json',
			},
			
			'projects': {
				projects: STF.Configs.Path.URL.json + 'test-projects.json'
			}
		};
		
		
		this.aSounds = {
			'home': {
				'sound-id': STF.Configs.Path.URL.sounds + 'fake-sound.mp3'
			}
		};
	}
	
	
}();

