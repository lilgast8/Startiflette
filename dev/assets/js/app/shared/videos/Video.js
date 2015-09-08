

APP.Video = (function(window){
	
	
	function Video($video, videoName) {
		APP.EventDispatcher.call(this);
		
		this.$ = {};
		this.p = {};
		this.v = {};
		
		this.E = {
			STARTED : 'started',
			UPDATE : 'update',
			ENDED : 'ended',
			SHOWN : 'shown',
			HIDDEN : 'hidden'
		};
		
		this.$.video = $video;
		this.v.videoName = videoName;
		
		this.v.isActive = false;
		this.v.isPlayed = false;
		this.v.isCanPlayThrough = false;
		
		this.initElt();
	}
	
	
	Video.prototype = Object.create(APP.EventDispatcher.prototype);
	Video.prototype.constructor = Video;
	
	
	Video.prototype.initElt = function() {
		this.bindEvents();
		
		this.$.video[0].setAttribute('preload', 'auto');
	};
	
	
	Video.prototype.bindEvents = function() {
		this.p.videoPlay = $.proxy(_canPlayThrough, this);
		this.$.video.on('canplaythrough', this.p.videoPlay);
		
		this.p.videoEnded = $.proxy(_ended, this);
		this.$.video.on('ended', this.p.videoEnded);
	};
	
	
	Video.prototype.unbindEvents = function() {
		this.$.video.off('canplaythrough', this.p.videoPlay);
		this.$.video.off('ended', this.p.videoEnded);
		
		this.p = {};
	};
	
	
	Video.prototype.destroy = function() {
		this.unbindEvents();
		
		this.$ = {};
		this.v = {};
	};
	
	
	Video.prototype.play = function() {
		_setActive.call(this);
		
		_managePlay.call(this);
	};
	
	
	Video.prototype.stop = function() {
		this.v.isActive = false;
		
		this.$.video[0].pause();
		this.$.video[0].currentTime = 0;
	};
	
	
	Video.prototype.getProgress = function() {
		if(!this.v.duration) return false;
		
		var percentage = Math.round( this.$.video[0].currentTime / this.v.duration * 100 );
		
		return percentage;
	};
	
	
	var _ended = function() {
		this.dispatch(this.E.ENDED);
		
		this.$.video[0].currentTime = 0;
		
		_setInactive.call(this);
	};
	
	
	var _canPlayThrough = function() {
		this.v.isCanPlayThrough = true;
		
		if(this.v.isPlayed) 
			_managePlay.call(this);
	};
	
	
	var _setActive = function() {
		this.v.isActive = true;
	};
	
	
	var _setInactive = function() {
		this.v.isActive = false;
	};
	
	
	var _managePlay = function() {
		if(!this.v.isActive) 
			return false;
		
		if(!this.v.isPlayed);
			this.v.isPlayed = true;
		
		if(this.v.isCanPlayThrough) {
			this.$.video[0].play();
			this.v.duration = this.$.video[0].duration;
		}
	};
	
	
	return Video;
	
	
})(window);

