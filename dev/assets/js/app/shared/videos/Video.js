

STF.Video = ( function( window ) {
	'use strict';
	
	
	function Video( $video, videoName ) {
		STF.EventDispatcher.call( this );
		
		this.E = {
			STARTED:	'started',
			UPDATE:		'update',
			ENDED:		'ended',
			SHOWN:		'shown',
			HIDDEN:		'hidden'
		};
		
		this.$video				= $video;
		this.videoName			= videoName;
		
		this.isActive			= false;
		this.isPlayed			= false;
		this.isCanPlayThrough	= false;
		
		this.initElt();
	}
	
	
	Video.prototype				= Object.create( STF.EventDispatcher.prototype );
	Video.prototype.constructor	= Video;
	
	
	Video.prototype.initElt = function() {
		this.bindEvents();
		
		this.$video[0].setAttribute( 'preload', 'auto' );
	};
	
	
	Video.prototype.bindEvents = function() {
		this.$video.on( 'canplaythrough', $.proxy( _canPlayThrough, this ) );
		this.$video.on( 'ended', $.proxy( _ended, this ) );
	};
	
	
	Video.prototype.unbindEvents = function() {
		this.$video.off( 'canplaythrough', $.proxy( _canPlayThrough, this ) );
		this.$video.off( 'ended', $.proxy( _ended, this ) );
	};
	
	
	Video.prototype.destroy = function() {
		this.unbindEvents();
	};
	
	
	Video.prototype.play = function() {
		_setActive.call( this );
		
		_managePlay.call( this );
	};
	
	
	Video.prototype.stop = function() {
		this.isActive = false;
		
		this.$video[0].pause();
		this.$video[0].currentTime = 0;
	};
	
	
	Video.prototype.getProgress = function() {
		if ( !this.duration )
			return;
		
		var percentage = Math.round( this.$video[0].currentTime / this.duration * 100 );
		
		return percentage;
	};
	
	
	var _ended = function() {
		this.dispatch( this.E.ENDED );
		
		this.$video[0].currentTime = 0;
		
		_setInactive.call( this );
	};
	
	
	var _canPlayThrough = function() {
		this.isCanPlayThrough = true;
		
		if ( this.isPlayed ) 
			_managePlay.call(this);
	};
	
	
	var _setActive = function() {
		this.isActive = true;
	};
	
	
	var _setInactive = function() {
		this.isActive = false;
	};
	
	
	var _managePlay = function() {
		if ( !this.isActive ) 
			return;
		
		if ( !this.isPlayed );
			this.isPlayed = true;
		
		if ( this.isCanPlayThrough ) {
			this.$video[0].play();
			this.duration = this.$video[0].duration;
		}
	};
	
	
	return Video;
	
	
} ) ( window );

