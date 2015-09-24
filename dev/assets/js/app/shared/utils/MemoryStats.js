

STF.Utils = STF.Utils || {};


STF.Utils.MemoryStats = ( function( window ) {
	
	
	function MemoryStats() {
		this.stats = null;
	}
	
	
	MemoryStats.prototype.init = function() {
		this.stats = new window.MemoryStats();
		
		this.stats.domElement.style.position	= 'fixed';
		this.stats.domElement.style.right		= '0px';
		this.stats.domElement.style.bottom		= '0px';
		this.stats.domElement.style.zIndex		= 88;
		
		document.body.appendChild( this.stats.domElement );
		
		TweenLite.ticker.addEventListener( 'tick', this.update, this );
	};
	
	
	MemoryStats.prototype.update = function() {
		this.stats.update();
	};
	
	
	return new MemoryStats();
	
	
} ) ( window );

