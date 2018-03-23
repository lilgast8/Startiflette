

STF.Controllers.Orientation = new class Orientation extends STF.Events.CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			ORIENTATION_CHANGE: 'orientationchange'
		};
		
		this.X_AMP						= 20;
		this.Y_AMP						= 10;
		this.DEBUG						= false;
		
		this.prevbW						= null;
		this.orientation				= null;
		this.IS_PORTRAIT				= null;
		this.IS_LANDSCAPE				= null;
		
		this.refPortraitOrientation		= null;
		this.refLandscapeOrientation	= null;
		
		this.needDispatchEvent			= null;
		this.needValuesUpdate			= true;
		this.refValues					= { x:0, y:0, z:0 };
		this.values						= { x:0, y:0, z:0 };
		this.valuesI					= { x:0, y:0, z:0 };
		
		this.isTimeoutUpdate			= false;
		this.stoChangeOrientation		= null;
		
		this.GYROSCOPE_INERTIA			= 0.05;
	}
	
	
	init( $window = $( window ), xAmp = this.X_AMP, yAmp = this.Y_AMP, needDispatchEvent = false, debug = this.DEBUG ) {
		this._initDOM( $window );
		this._initEl( xAmp, yAmp, needDispatchEvent, debug );
		this._bindEvents();
		
		this._resize();
	}
	
	
	_initDOM( $window ) {
		this.$window = $window;
	}
	
	
	_initEl( xAmp, yAmp, needDispatchEvent, debug ) {
		this.X_AMP				= xAmp;
		this.Y_AMP				= yAmp;
		this.needDispatchEvent	= needDispatchEvent;
		this.DEBUG				= debug;
		
		this._onOrientationChange();
		
		if ( this.DEBUG )
			this._initDebug();
	}
	
	
	_bindEvents() {
		this.$window.on( 'deviceorientation', $.proxy( this._deviceorientation, this ) );
		STF.Controllers.Screen.bind( STF.Controllers.Screen.E.RESIZE, this._resize, this );
		STF.Controllers.Main.bind( STF.Controllers.Main.E.RAF, this._raf, this );
	}
	
	
	_resize( p ) {
		this._onOrientationChange();
	}
	
	
	_raf() {
		this.valuesI.x = STF_math_getInertia( this.values.x, this.valuesI.x, this.GYROSCOPE_INERTIA, false );
		this.valuesI.y = STF_math_getInertia( this.values.y, this.valuesI.y, this.GYROSCOPE_INERTIA, false );
		this.valuesI.z = STF_math_getInertia( this.values.z, this.valuesI.z, this.GYROSCOPE_INERTIA, false );
	}
	
	
	_onOrientationChange() {
		if ( STF.Configs.Device.IS_DESKTOP || this.prevbW == STF.Controllers.Screen.bW )
			return;
		
		
		this.prevbW = STF.Controllers.Screen.bW;
		
		if ( STF.Controllers.Screen.wH > STF.Controllers.Screen.bW ) {
			this.orientation	= 'portrait';
			this.IS_PORTRAIT	= true;
			this.IS_LANDSCAPE	= false;
		}
		else {
			this.orientation	= 'landscape';
			this.IS_LANDSCAPE	= true;
			this.IS_PORTRAIT	= false;
		}
		
		this.needValuesUpdate = true;
		
		if ( this.needDispatchEvent )
			this.dispatch( this.E.ORIENTATION_CHANGE );
	}
	
	
	_deviceorientation( e ) {
		const x = this.IS_PORTRAIT ? e.beta : e.gamma;
		const y = this.IS_PORTRAIT ? e.gamma : e.beta;
		const z = e.alpha;
		
		this._setRefValues( x, y, z );
		
		if ( this.IS_PORTRAIT )
			this._setPortraitValues( x, y, z );
		else
			this._setLandscapeValues( x, y, z );
		
		if ( this.values.y > this.X_AMP )
			this.values.y = this.X_AMP;
		else if ( this.values.y < -this.X_AMP )
			this.values.y = -this.X_AMP;
		
		if ( this.values.x > this.Y_AMP )
			this.values.x = this.Y_AMP;
		else if ( this.values.x < -this.Y_AMP )
			this.values.x = -this.Y_AMP;
		
		
		if ( this.DEBUG ) {
			if ( this.IS_PORTRAIT )
				this.$debugRawValues.innerHTML = 'x: ' + Math.round( e.beta ) + '<br>y: ' + Math.round( e.gamma ) + '<br>z: ' + Math.round( e.alpha );
			else
				this.$debugRawValues.innerHTML = 'x: ' + Math.round( e.gamma ) + '<br>y: ' + Math.round( e.beta ) + '<br>z: ' + Math.round( e.alpha );
			
			this.$debugNormValues.innerHTML = 'x: ' + Math.round( this.values.x ) + '<br>y: ' + Math.round( this.values.y ) + '<br>z: ' + Math.round( this.values.z );
		}
	}
	
	
	_setRefValues( x, y, z  ) {
		if ( !this.needValuesUpdate )
			return;
		
		
		this.needValuesUpdate = false;
		
		if ( this.IS_PORTRAIT ) {
			this.refPortraitOrientation		= this._getPortraitOrientation( x, y, z );
			this.refLandscapeOrientation	= null;
		} else {
			this.refPortraitOrientation		= null;
			this.refLandscapeOrientation	= this._getLandscapeOrientation( x, y, z );
		}
		
		this.refValues = {
			x: x,
			y: y,
			z: z
		};
		this.refSymbols = {
			x: this.refValues.x < 0 ? -1 : 1,
			y: this.refValues.y < 0 ? -1 : 1,
			z: this.refValues.z < 0 ? -1 : 1
		};
	}
	
	
	_setPortraitValues( x, y, z ) {
		this.values.x = x - this.refValues.x;
		this.values.y = ( this.refValues.y - y ) * this._getCoeffY( x ); // _getCoeffY: used to decrease Y value (make it less sensitive) when X is getting close to 90° (vertical)
		this.values.z = this.refValues.z - z;
		
		const portraitOrientation = this._getPortraitOrientation( x, y, z );
		
		if ( this.refPortraitOrientation == 'bottom+' && portraitOrientation == 'bottom-' )
			this.values.y *= -1;
		else if ( this.refPortraitOrientation == 'bottom-' && portraitOrientation == 'bottom+' )
			this.values.y *= -1;
	}
	
	
	_getCoeffY( x ) {
		let coeffY = Math.round( Math.abs( 90 - x ) ) / 40;
		
		if ( coeffY < 0.2 )
			coeffY = 0.2;
		else if ( coeffY > 1 )
			coeffY = 1;
		
		coeffY *= coeffY;
		
		
		return coeffY;
	}
	
	
	_getPortraitOrientation( x, y, z ) {
		let portraitOrientation;
		
		if ( x <= 90 )
			portraitOrientation = 'bottom+';
		else if ( x > 90 )
			portraitOrientation = 'bottom-';
		
		
		return portraitOrientation;
	}
	
	
	_setLandscapeValues( x, y, z ) {
		const xSymbol = x < 0 ? -1 : 1;
		const ySymbol = y < 0 ? -1 : 1;
		const zSymbol = z < 0 ? -1 : 1;
		
		const landscapeOrientation = this._getLandscapeOrientation( x, y, z );
		
		if ( landscapeOrientation == 'right+' ) {
			this.values.x = this.refValues.x - x;
			this.values.y = this.refValues.y - y;
		}
		else if ( landscapeOrientation == 'right-' ) {
			this.values.x = this.refValues.x - x;
			this.values.y = ( 180 - Math.abs( y ) ) * ySymbol - ( 180 - Math.abs( this.refValues.y ) ) * this.refSymbols.y;
		}
		else if ( landscapeOrientation == 'left+' ) {
			this.values.x = ( this.refValues.x - x ) * -1;
			this.values.y = ( this.refValues.y - y ) * -1;
		}
		else if ( landscapeOrientation == 'left-' ) {
			this.values.x = ( this.refValues.x - x ) * -1;
			this.values.y = ( Math.abs( y ) - 180 ) * ySymbol - ( Math.abs( this.refValues.y ) - 180 ) * this.refSymbols.y;
		}
		
		if ( landscapeOrientation != this.refLandscapeOrientation ) {
			if ( this.refLandscapeOrientation == 'right+' && landscapeOrientation == 'right-' ) {
				this.values.x = this.refValues.x - x + 180;
				this.values.y = ( 180 - Math.abs( this.refValues.y - y ) ) * ySymbol * -1;
			}
			else if ( this.refLandscapeOrientation == 'right-' && landscapeOrientation == 'right+' ) {
				this.values.x = this.refValues.x - x - 180;
				this.values.y = ( this.refValues.y - y + 180 ) * -1;
			}
			else if ( this.refLandscapeOrientation == 'left+' && landscapeOrientation == 'left-' ) {
				this.values.x = ( this.refValues.x - x ) * -1 + 180;
				this.values.y = ( 180 - Math.abs( ( this.refValues.y - y ) * -1 ) ) * ySymbol;
			}
			else if ( this.refLandscapeOrientation == 'left-' && landscapeOrientation == 'left+' ) {
				this.values.x = ( this.refValues.x - x ) * -1 - 180;
				this.values.y = ( ( this.refValues.y - y ) * -1 + 180 ) * -1;
			}
			
			if ( this.refLandscapeOrientation.indexOf( 'right') >= 0 && landscapeOrientation.indexOf( 'left') >= 0 ||
				 this.refLandscapeOrientation.indexOf( 'left') >= 0 && landscapeOrientation.indexOf( 'right') >= 0 ) {
				if ( this.isTimeoutUpdate )
					return;
				
				
				this.isTimeoutUpdate = true;
				
				this.stoChangeOrientation = setTimeout( () => {
					this.needValuesUpdate	= true;
					this.isTimeoutUpdate	= false;
				}, 1500 );
			}
		}
		
		this.values.z = this.refValues.z - z;
	}
	
	
	_getLandscapeOrientation( x, y, z ) {
		let landscapeOrientation;
		const absRefY = Math.abs( y );
		
		if ( x <= 0 && absRefY <= 90  )
			landscapeOrientation = 'right+';
		else if ( x >= 0 && absRefY > 90  )
			landscapeOrientation = 'right-';
		else if ( x > 0 && absRefY <= 90  )
			landscapeOrientation = 'left+';
		else if ( x < 0 && absRefY >= 90  )
			landscapeOrientation = 'left-';
		
		
		return landscapeOrientation;
	}
	
	
	forceUpdate() {
		this.needValuesUpdate = true;
	}
	
	
	_initDebug() {
		this.$debugRawValues				= document.createElement( 'div' );
		this.$debugRawValues.style.cssText	= 'position:absolute;left:0;top:0;width:50%;font:normal 12px/16px Arial;color:#fff;text-align:center;background-color:rgba(0,0,0,0.5);z-index:8888;';
		
		this.$debugNormValues				= document.createElement( 'div' );
		this.$debugNormValues.style.cssText	= 'position:absolute;right:0;top:0;width:50%;font:normal 12px/16px Arial;color:#fff;text-align:center;background-color:rgba(0,0,0,0.5);z-index:8888;';
		
		document.body.appendChild( this.$debugRawValues );
		document.body.appendChild( this.$debugNormValues );
	}
	
	
}();

