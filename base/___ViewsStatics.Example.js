

APP.Views			= APP.Views || {};
APP.Views.Statics	= APP.Views.Statics || {};


APP.Views.Statics.Example = ( function( window ) {
	
	
	function Example() {
		APP.AbstractView.call( this );
	}
	
	
	Example.prototype				= Object.create( APP.AbstractView.prototype );
	Example.prototype.constructor	= Example;
	
	
	Example.prototype.init = function() {
		APP.AbstractView.prototype.init.call( this );
		
		// init others objects
	};
	
	
	Example.prototype.initDOM = function() {
		// console.log('Example.initDOM()');
	};
	
	
	Example.prototype.bindEvents = function() {
		// console.log('Example.bindEvents()');
	};
	
	
	Example.prototype.initTl = function() {
		// console.log('Example.initTl()');
	};
	
	
	Example.prototype.resize = function() {
		// console.log('Example.resize()');
	};
	
	
	return Example;
	
	
} ) ( window );

