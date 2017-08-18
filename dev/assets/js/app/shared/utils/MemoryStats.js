'use strict';


var Stats = require( 'memory-stats' );



function MemoryStats() {
	this.stats = null;
}


MemoryStats.prototype.init = function() {
	this.stats = new Stats();
	
	this.stats.domElement.style.position	= 'fixed';
	this.stats.domElement.style.right		= '0px';
	this.stats.domElement.style.bottom		= '48px';
	this.stats.domElement.style.zIndex		= 88;
	
	document.body.appendChild( this.stats.domElement );
};


MemoryStats.prototype.update = function() {
	this.stats.update();
};


module.exports = MemoryStats;

