

STF.Configs.Props = new class Props {
	
	
	constructor() {
		this.HAS_PUSHSTATE		= null;
		this.TRANSFORM			= null;
		this.HAS_TRANSFORMS		= null;
		this.HAS_TRANSFORMS_3D	= null;
		this.HAS_TRANSITIONS	= null;
		this.HAS_ANIMATIONS		= null;
	}
	
	
	init() {
		this._setProperties();
	}
	
	
	_setProperties() {
		this.HAS_PUSHSTATE		= Modernizr.history;
		this.TRANSFORM			= Modernizr.prefixed( 'transform' );
		this.HAS_TRANSFORMS		= Modernizr.csstransforms;
		this.HAS_TRANSFORMS_3D	= Modernizr.csstransforms3d;
		this.HAS_TRANSITIONS	= Modernizr.csstransitions;
		this.HAS_ANIMATIONS		= Modernizr.cssanimations;
		
		this.HAS_WEBGL			= window.Detector !== undefined ? Detector.webgl : null;
	}
	
	
}();

