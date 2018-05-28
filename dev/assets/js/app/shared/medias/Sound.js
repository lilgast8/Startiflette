

STF.Views.Partials.Sound = class Sound extends STF.Abstracts.AbstractView {
	
	
	constructor( id, volume = 1, volumeCoeff = 1, loop = -1 ) {
		super();
		
		this.id			= id;
		this.vol		= volume;
		this.volCoeff	= volumeCoeff;
		this.loop		= loop;
		
		this.sound	= null;
		this.dur	= null;
		this.pos	= null;
		
		this.isPlay	= false;
		
		
		this.init();
	}
	
	
	initEl() {
		this.sound			= createjs.Sound.createInstance( this.id );
		this.sound.volume	= this.vol * this.volCoeff;
		this.sound.loop		= this.loop;
		
		this.duration		= this.sound.duration / 1000;
	}
	
	
	bindEvents() {
		STF.Controllers.Main.bind( STF.Controllers.Main.E.RAF, this.raf, this );
		
		this.sound.on( 'complete', this._onSoundComplete, this );
	}
	
	
	unbindEvents() {
		STF.Controllers.Main.unbind( STF.Controllers.Main.E.RAF, this.raf, this );
		
		this.sound.off( 'complete', this._onSoundComplete, this );
	}
	
	
	raf() {
		this.time = this.sound.position / 1000;
	}
	
	
	destroy() {
		super.destroy();
		
		 createjs.Sound.removeSound( this.id );
	}
	
	
	get duration() {
		return this.dur;
	}
	
	
	set duration( value ) {
		this.dur = value;
	}
	
	
	get time() {
		return this.pos;
	}
	
	
	set time( value ) {
		this.pos = value;
	}
	
	
	get volume() {
		return this.vol;
	}
	
	
	set volume( value ) {
		this.vol = value;
		
		this.sound.volume = this.vol * this.volCoeff;
	}
	
	
	get volumeCoeff() {
		return this.volCoeff;
	}
	
	
	set volumeCoeff( value ) {
		this.volCoeff = value;
		
		this.sound.volume = this.vol * this.volCoeff;
	}
	
	
	get played() {
		return this.isPlay;
	}
	
	
	set played( value ) {
		this.isPlay = value;
	}
	
	
	play() {
		this.sound.play();
		
		this.played = true;
	}
	
	
	stop() {
		this.sound.stop();
		
		this.played = false;
	}
	
	
	_onSoundComplete() {
		this.played = false;
	}
	
	
};

