

STF.Video = ( function( window ) {


class Video extends STF.AbstractView {
	
	
	constructor( id, url, poster, isFireLoadStart, isFireCanPlay, isFireCanPlayThrough ) {
		super( this );
		
		this.E = {
			LOAD_START:			'loadStart',
			CAN_PLAY:			'canPlay',
			CAN_PLAY_THROUGH:	'canPlayThrough',
			LOADING_PROGRESS:	'loadingProgress',
			ENDED:				'ended'
		};
		
		this.id						= id;
		this.url					= url;
		this.poster					= poster;
		this.isFireLoadStart		= isFireLoadStart;
		this.isFireCanPlay			= isFireCanPlay;
		this.isFireCanPlayThrough	= isFireCanPlayThrough;
		
		this.isDynamic				= this.url === null ? false : true;
		
		this.duration				= null;
		this.isLoadStart			= false;
		this.isCanPlay				= false;
		this.isCanPlayThrough		= false;
	}
	
	
	initDOM() {
		this.$video = $( document.getElementById( this.id ) );
	}
	
	
	initEl() {
		this._setPoster();
		this.setUrl( null );
	}
	
	
	bindEvents() {
		this.$video.on( 'loadstart', $.proxy( this._loadStart, this ) );
		this.$video.on( 'canplay', $.proxy( this._canPlay, this ) );
		this.$video.on( 'canplaythrough', $.proxy( this._canPlayThrough, this ) );
	}
	
	
	unbindEvents() {
		this.$video.off( 'loadstart', $.proxy( this._loadStart, this ) );
		this.$video.off( 'canplay', $.proxy( this._canPlay, this ) );
		this.$video.off( 'canplaythrough', $.proxy( this._canPlayThrough, this ) );
	}
	
	
	_setPoster() {
		if ( this.poster === null )
			return;
		
		this.$video[0].setAttribute( 'poster', this.poster );
	}
	
	
	setUrl( url ) {
		if ( this.isDynamic )
			this.$video[0].src = this.url;
	}
	
	
	load() {
		this.$video[0].load();
		this.$video[0].setAttribute( 'preload', 'auto' );
	}
	
	
	play() {
		this.$video[0].play();
	}
	
	
	pause() {
		this.$video[0].pause();
	}
	
	
	getDuration() {
		return this.duration;
	}
	
	
	getCurrentTime() {
		return this.$video[0].currentTime;
	}
	
	
	setCurrentTime( currentTime ) {
		this.$video[0].currentTime = currentTime;
	}
	
	
	setVolume( volume ) {
		this.$video[0].volume = volume;
	}
	
	
	getProgress() {
		if ( !this.duration )
			return;
		
		const percentage = Math.round( this.$video[0].currentTime / this.duration * 100 );
		
		return percentage;
	}
	
	
	_loadStart() {
		if ( this.isFireLoadStart && !this.isLoadStart && STF.Device.IS_DESKTOP ) {
			this.isLoadStart = true;
			
			this.dispatch( this.E.LOAD_START );
		}
	}
	
	
	_canPlay() {
		if ( this.isFireCanPlay && !this.isCanPlay && STF.Device.IS_DESKTOP ) {
			this.isCanPlay	= true;
			this.duration	= this.$video[0].duration;
			
			this.dispatch( this.E.CAN_PLAY );
		}
	}
	
	
	_canPlayThrough() {
		if ( this.isFireCanPlayThrough && !this.isCanPlayThrough ) {
			this.isCanPlayThrough = true;
			
			if ( STF.Device.IS_DESKTOP )
				this.dispatch( this.E.CAN_PLAY_THROUGH );
		}
	}
	
	
}


return Video;


} ) ( window );

