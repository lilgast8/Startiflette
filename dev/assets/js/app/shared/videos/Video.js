

STF.Video = ( function( window ) {
	'use strict';
	
	
	function Video( idVideo, isFireLoadStart, isFireCanPlay, isFireCanPlayThrough ) {
		MFC.AbstractView.call( this );
		
		this.E = {
			LOAD_START:			'loadStart',
			CAN_PLAY:			'canPlay',
			CAN_PLAY_THROUGH:	'canPlayThrough',
			LOADING_PROGRESS:	'loadingProgress',
			ENDED:				'ended'
		};
		
		this.idVideo				= idVideo;
		this.isFireLoadStart		= isFireLoadStart;
		this.isFireCanPlay			= isFireCanPlay;
		this.isFireCanPlayThrough	= isFireCanPlayThrough;
		
		this.duration				= null;
		this.isLoadStart			= false;
		this.isCanPlay				= false;
		this.isCanPlayThrough		= false;
		
		this.initElt();
	}
	
	
	Video.prototype				= Object.create( MFC.AbstractView.prototype );
	Video.prototype.constructor	= Video;
	
	
	Video.prototype.setUrl = function( url ) {
		this.$video[0].src = url;
	};
	
	
	Video.prototype.initElt = function() {
		this.$video = $( document.getElementById( this.idVideo ) );
		
		this.bindEvents();
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
		if ( this.isFireLoadStart && !this.isLoadStart && MFC.Config.DEVICE == 'desktop' ) {
			// console.log( '_loadStart' );
			
			this.isLoadStart = true;
			
			this.dispatch( this.E.LOAD_START );
		}
	};
	
	
	var _canPlay = function() {
		if ( this.isFireCanPlay && !this.isCanPlay && MFC.Config.DEVICE == 'desktop' ) {
			// console.log( '_canPlay' );
			
			this.isCanPlay	= true;
			this.duration	= this.$video[0].duration;
			
			this.dispatch( this.E.CAN_PLAY );
		}
	};
	
	
	var _canPlayThrough = function() {
		if ( this.isFireCanPlayThrough && !this.isCanPlayThrough ) {
			// console.log( '_canPlayThrough' );
			
			this.isCanPlayThrough = true;
			
			if ( MFC.Config.DEVICE == 'desktop' )
				this.dispatch( this.E.CAN_PLAY_THROUGH );
		}
	};
	
	
	return Video;
	
	
} ) ( window );

