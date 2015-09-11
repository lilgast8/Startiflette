

APP.Views			= APP.Views || {};
APP.Views.Statics	= APP.Views.Statics || {};


APP.Views.Statics.MainLoaderView = ( function( window ) {
	
	
	function MainLoaderView() {
		APP.AbstractView.call(this);
	}
	
	
	MainLoaderView.prototype				= Object.create( APP.AbstractView.prototype );
	MainLoaderView.prototype.constructor	= MainLoaderView;
	
	
	MainLoaderView.prototype.initDOM = function() {
		this.$mainLoader	= $( document.getElementById( 'main-loader' ) );
		this.$percentage	= this.$mainLoader.find('.main-loader-percentage');
		this.$progress		= this.$mainLoader.find( '.main-loader-progress' );
	};
	
	
	MainLoaderView.prototype.initTl = function() {
		this.tl.showViewInit = new TimelineLite( { paused:true, onComplete:function(){
			console.log('YALA');
		}.bind(this) } );
		
		this.tl.showViewInit.to( this.$mainLoader, 1.5, { xPercent:100, ease:Quart.easeInOut }, 0 );
		this.tl.showViewInit.to( this.$percentage, 1.5, { xPercent:-100, ease:Quart.easeInOut }, 0 );
	};
	
	
	MainLoaderView.prototype.progress = function( percentage ) {
		var posX = percentage - 100;
		
		this.$percentage[0].innerHTML = parseInt( percentage ) + '%';
		this.$progress[0].style[ APP.Config.TRANSFORM ] = 'translate(' + posX + '%, 0%)';
	};
	
	
	MainLoaderView.prototype.showViewInit = function() {
		this.tl.showViewInit.play();
	};
	
	
	return MainLoaderView;
	
	
} ) ( window );

