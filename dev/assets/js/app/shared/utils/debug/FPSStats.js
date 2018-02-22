

STF.Utils.Debug.FPSStats = new class FPSStats {
	
	
	constructor() {
		this.stats = null;
	}
	
	
	init() {
		this.stats = new Stats();
		
		this.stats.setMode( 0 );
		
		this.stats.dom.style.top	= 'auto';
		this.stats.dom.style.right	= 'auto';
		this.stats.dom.style.bottom	= '0px';
		this.stats.dom.style.left	= '0px';
		this.stats.dom.style.zIndex	= 88;
		
		document.body.appendChild( this.stats.dom );
	}
	
	
	begin() {
		this.stats.begin();
	}
	
	
	end() {
		this.stats.end();
	}
	
	
}();

