

STF.Utils = STF.Utils || {};


STF.Utils.MemoryStats = ( function( window ) {


class MemoryStats {
	
	
	constructor() {
		this.stats = null;
	}
	
	
	init() {
		this.stats = new window.MemoryStats();
		
		this.stats.domElement.style.position	= 'fixed';
		this.stats.domElement.style.left		= '0px';
		this.stats.domElement.style.bottom		= '48px';
		this.stats.domElement.style.zIndex		= 88;
		
		document.body.appendChild( this.stats.domElement );
	}
	
	
	update() {
		this.stats.update();
	}
	
	
}


return new MemoryStats();


} ) ( window );

