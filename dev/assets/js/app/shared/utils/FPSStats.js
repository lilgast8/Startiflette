

STF.Utils = STF.Utils || {};


STF.Utils.FPSStats = (function(window){
	
	
	function FPSStats() {
		this.stats = null;
	}
	
	
	FPSStats.prototype.init = function() {
		this.stats = new Stats();
		
		this.stats.setMode(0);
		
		this.stats.domElement.style.position	= 'fixed';
		this.stats.domElement.style.right		= '0px';
		this.stats.domElement.style.bottom		= '0px';
		this.stats.domElement.style.zIndex		= 88;
		
		document.body.appendChild( this.stats.domElement );
	};
	
	
	FPSStats.prototype.begin = function() {
		this.stats.begin();
	};
	
	
	FPSStats.prototype.end = function() {
		this.stats.end();
	};
	
	
	return new FPSStats();
	
	
})(window);

