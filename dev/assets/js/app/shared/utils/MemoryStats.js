

STF.Utils = STF.Utils || {};


STF.Utils.MemoryStats = ( function( window ) {
	'use strict';
	
	
	function MemoryStats() {
		this.stats = null;
	}
	
	
	MemoryStats.prototype.init = function() {
		this.stats = new window.MemoryStats();
		
		this.stats.domElement.style.position	= 'fixed';
		this.stats.domElement.style.right		= '0px';
		this.stats.domElement.style.bottom		= '48px';
		this.stats.domElement.style.zIndex		= 88;
		
		document.body.appendChild( this.stats.domElement );
	};
	
	
	MemoryStats.prototype.update = function() {
		this.stats.update();
	};
	
	
	return new MemoryStats();
	
	
} ) ( window );

