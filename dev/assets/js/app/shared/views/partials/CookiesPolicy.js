

STF.Views.Partials.CookiesPolicy = new class CookiesPolicy extends STF.Abstracts.AbstractView {
	
	
	constructor() {
		super();
		
		this.name = 'cookies-policy';
		this.time = 88;
	}
	
	
	/**
	 * Init object
	 * @params {string} prefix = '': add a prefix to the name of the cookie
	 * @params {int} time = 88: time during which the cookie will exist
	 */
	init( prefix = '', time = this.time ) {
		super.init();
		
		this.name = prefix == '' ? this.name : `${prefix}-${this.name}`;
		this.time = time;
		
		this._checkCookie();
	}
	
	
	initDOM() {
		this.$cookies	= $( document.getElementById( 'cookies-policy' ) );
		this.$close		= this.$cookies.find( '.cookies-policy-close' );
	}
	
	
	initTl() {
		this.tl.showPopIn = new TimelineLite( { paused:true } );
		this.tl.showPopIn.to( this.$cookies, 0.5, { opacity:1, ease:Quad.easeInOut } );
		
		
		this.tl.hidePopIn = new TimelineLite( {
			paused:			true,
			onStart:		this._createCookie,
			onComplete:		this.destroy,
			callbackScope:	this
		} );
		this.tl.hidePopIn.to( this.$cookies, 0.5, { opacity:0, ease:Quad.easeInOut } );
	}
	
	
	bindEvents() {
		this.$close.on( 'click', $.proxy( this._closePopIn, this ) );
	}
	
	
	unbindEvents() {
		this.$close.off( 'click', $.proxy( this._closePopIn, this ) );
	}
	
	
	_checkCookie() {
		if ( Cookies.get( this.name ) != 'true' )
			this._showPopIn();
		else
			this.destroy();
	}
	
	
	_showPopIn() {
		this.$cookies[0].style.display = 'block';
		this.$cookies[0].offsetHeight; // jshint ignore:line
		
		this.tl.showPopIn.play();
	}
	
	
	_closePopIn() {
		this.tl.hidePopIn.play();
	}
	
	
	_createCookie() {
		Cookies.set( this.name, 'true', { expires: this.time } );
	}
	
	
}();

