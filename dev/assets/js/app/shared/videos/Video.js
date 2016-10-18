

STF.Video = ( function( window ) {
	'use strict';
	
	
	function Video( id, url, poster, isFireLoadStart, isFireCanPlay, isFireCanPlayThrough ) {
		STF.AbstractView.call( this );
		
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
	
	
	Video.prototype				= Object.create( STF.AbstractView.prototype );
	Video.prototype.constructor	= Video;
	
	
	Video.prototype.initDOM = function() {
		this.$video = $( document.getElementById( this.id ) );
	};
	
	
	Video.prototype.initEl = function() {
		_setPoster.call( this );
		this.setUrl( null );
	};
	
	
	Video.prototype.bindEvents = function() {
		this.$video.on( 'loadstart', $.proxy( _loadStart, this ) );
		this.$video.on( 'canplay', $.proxy( _canPlay, this ) );
		this.$video.on( 'canplaythrough', $.proxy( _canPlayThrough, this ) );
	};
	
	
	Video.prototype.unbindEvents = function() {
		this.$video.off( 'loadstart', $.proxy( _loadStart, this ) );
		this.$video.off( 'canplay', $.proxy( _canPlay, this ) );
		this.$video.off( 'canplaythrough', $.proxy( _canPlayThrough, this ) );
	};
	
	
	var _setPoster = function() {
		if ( this.poster === null )
			return;
		
		this.$video[0].setAttribute( 'poster', this.poster );
	};
	
	
	Video.prototype.setUrl = function( url ) {
		if ( this.isDynamic )
			this.$video[0].src = this.url;
	};
	
	
	Video.prototype.load = function() {
		this.$video[0].load();
		this.$video[0].setAttribute( 'preload', 'auto' );
	};
	
	
	Video.prototype.play = function() {
		this.$video[0].play();
	};
	
	
	Video.prototype.pause = function() {
		this.$video[0].pause();
	};
	
	
	Video.prototype.getDuration = function() {
		return this.duration;
	};
	
	
	Video.prototype.getCurrentTime = function() {
		return this.$video[0].currentTime;
	};
	
	
	Video.prototype.setCurrentTime = function( currentTime ) {
		this.$video[0].currentTime = currentTime;
	};
	
	
	Video.prototype.setVolume = function( volume ) {
		this.$video[0].volume = volume;
	};
	
	
	Video.prototype.getProgress = function() {
		if ( !this.duration )
			return;
		
		var percentage = Math.round( this.$video[0].currentTime / this.duration * 100 );
		
		return percentage;
	};
	
	
	var _loadStart = function() {
		if ( this.isFireLoadStart && !this.isLoadStart && STF.Device.IS_DESKTOP ) {
			this.isLoadStart = true;
			
			this.dispatch( this.E.LOAD_START );
		}
	};
	
	
	var _canPlay = function() {
		if ( this.isFireCanPlay && !this.isCanPlay && STF.Device.IS_DESKTOP ) {
			this.isCanPlay	= true;
			this.duration	= this.$video[0].duration;
			
			this.dispatch( this.E.CAN_PLAY );
		}
	};
	
	
	var _canPlayThrough = function() {
		if ( this.isFireCanPlayThrough && !this.isCanPlayThrough ) {
			this.isCanPlayThrough = true;
			
			if ( STF.Device.IS_DESKTOP )
				this.dispatch( this.E.CAN_PLAY_THROUGH );
		}
	};
	
	
	return Video;
	
	
} ) ( window );

