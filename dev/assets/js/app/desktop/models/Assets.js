'use strict';


var AbstractAssets	= require( 'desktop/abstracts/views/AbstractPageView' );
var Path			= require( 'shared/configs/Path' );



function Assets() {
	AbstractAssets.call( this );
}


Assets.prototype				= Object.create( AbstractAssets.prototype );
Assets.prototype.constructor	= Assets;


Assets.prototype.init = function() {
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
			Path.URL.img + 'temp/404.jpg',
		],
		
		'not-available': [
			/* temp */
			Path.URL.img + 'temp/not-available.gif',
		],
		
		'home': [
			/* temp */
			Path.URL.img + 'temp/home.jpg',
		],
		
		'about': [
			/* temp */
			Path.URL.img + 'temp/about-1.jpg',
			Path.URL.img + 'temp/about-2.jpg',
		],
		
		'projects': [
			/* temp */
			Path.URL.img + 'temp/projects.jpg',
		]
	};
	
	
	this.aJson = {
		'global': {
			global: Path.URL.json + 'test-global.json'
		},
		
		'home': {
			home: Path.URL.json + 'test-home.json'
		},
		
		'projects': {
			projects: Path.URL.json + 'test-projects.json'
		}
	};
};


module.exports = new Assets();

