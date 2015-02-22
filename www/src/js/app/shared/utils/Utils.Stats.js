

APP.Utils.Stats = (function(window){
	
	
	function Stats() {
		this.stats = null;
	}
	
	
	Stats.prototype.init = function() {
		this.stats = new Stats();
		this.stats.setMode(0);
		
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.right = '0px';
		this.stats.domElement.style.bottom = '0px';
		this.stats.domElement.style.zIndex = 88;
		
		document.body.appendChild(this.stats.domElement);
	};
	
	
	Stats.prototype.begin = function() {
		this.stats.begin();
	};
	
	
	Stats.prototype.end = function() {
		this.stats.end();
	};
	
	
	return new Stats();
	
	
})(window);

