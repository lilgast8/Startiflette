'use strict';


var Stats = require( 'stats' );



function FPSStats() {
	this.stats = null;
}


FPSStats.prototype.init = function() {
	this.stats = new Stats();
	
	this.stats.setMode( 0 );
	
	this.stats.dom.style.top		= 'auto';
	this.stats.dom.style.left		= 'auto';
	this.stats.dom.style.right		= '0px';
	this.stats.dom.style.bottom		= '0px';
	this.stats.dom.style.zIndex		= 88;
	
	document.body.appendChild( this.stats.dom );
};


FPSStats.prototype.begin = function() {
	this.stats.begin();
};


FPSStats.prototype.end = function() {
	this.stats.end();
};


module.exports = new FPSStats();

