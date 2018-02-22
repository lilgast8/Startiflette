

STF.Utils		= STF.Utils || {};
STF.Utils.Ease	= STF.Utils.Ease || {};


STF.Utils.Ease.Expo = ( function( window ) {


class Ease {
	
	
	constructor( value, pow, duration, timeBegin ) {
		this.value			= this.begin = this.end = value;
		this.pow			= pow;
		this.maxDuration	= duration;
		this.time			= timeBegin;
		
		this.init();
	}
	
	
	init() {
		this.begin		= this.end;
		this.end		= Math.random();
		this.time		= 0;
		this.duration	= Math.sqrt( Math.abs ( this.end - this.begin ) ) * this.maxDuration;
	}
	
	
	update( timeChange ) {
		if ( timeChange === undefined )
			timeChange = 1;
		
		let timeRatio = this.time / this.duration;
		
		if ( timeRatio < 0.5 )
			timeRatio = 0.5 * Math.pow( timeRatio * 2, this.pow );
		else
			timeRatio = 1 - 0.5 * Math.pow( ( 1 - timeRatio ) * 2, this.pow );
		
		this.value	= this.begin + timeRatio * ( this.end - this.begin );
		this.time	+= timeChange;
		
		if ( this.time > this.duration )
			this.init();
	}
	
	
}


return Ease;


} ) ( window );

