

STF.Abstracts.AbstractView = class AbstractView extends STF.Events.CustomEvent {
	
	
	constructor() {
		super();
		
		this.E		= {
			SHOW:	'show',
			SHOWN:	'shown',
			HIDE:	'hide',
			HIDDEN:	'hidden'
		};
		
		this.tw		= {};
		this.tl		= {};
		
		this.isInit	= false;
	}
	
	
	init() {
		this.initDOM();
		this.initEl();
		this.initTl();
		this.bindEvents();
		
		this.resize();
	}
	
	
	initDOM() {
		// console.log( 'AbstractView.initDOM() — ', this.constructor.name );
	}
	
	
	initEl() {
		// console.log( 'AbstractView.initEl() — ', this.constructor.name );
	}
	
	
	initTl() {
		// console.log( 'AbstractView.initTl() — ', this.constructor.name );
	}
	
	
	bindEvents() {
		// console.log( 'AbstractView.bindEvents() — ', this.constructor.name );
		
		STF.Core.Main.bind( STF.Core.Main.E.RESIZE, this.resize, this );
	}
	
	
	unbindEvents() {
		// console.log( 'AbstractView.unbindEvents() — ', this.constructor.name );
		
		STF.Core.Main.unbind( STF.Core.Main.E.RESIZE, this.resize, this );
	}
	
	
	initView() {
		// console.log( 'AbstractView.initView() — ', this.constructor.name );
		
		this.isInit = true;
	}
	
	
	show() {
		// console.log( 'AbstractView.show() — ', this.constructor.name );
	}
	
	
	hide() {
		// console.log( 'AbstractView.hide() — ', this.constructor.name );
	}
	
	
	resize() {
		// console.log( 'AbstractView.resize() — ', this.constructor.name );
	}
	
	
	raf() {
		// console.log( 'AbstractView.raf() — ', this.constructor.name );
	}
	
	
	destroy() {
		this.isInit = false;
		
		this.unbindEvents();
		
		this.destroyGSAP();
	}
	
	
	destroyGSAP() {
		/* tween */
		for ( const tween in this.tw )
			this.killTween( tween );
		
		/* timeline */
		for ( const timeline in this.tl )
			this.killTimeline( timeline );
		
		this.tl = {};
		this.tw = {};
	}
	
	
	killTween( twName ) {
		if ( !this.tw[ twName ] )
			return;
		
		this.tw[ twName ].kill();
		
		this.tw[ twName ] = null;
	}
	
	
	killTimeline( tlName ) {
		if ( !this.tl[ tlName ] )
			return;
		
		this.tl[ tlName ].stop();
		this.tl[ tlName ].clear();
		this.tl[ tlName ].kill();
		
		this.tl[ tlName ] = null;
	}
	
	
	/**
	 * Change the url
	 * @params {object or string} e: most of time is an object when it come from a click on a link,
	 *								 but if you need to force a specific url you can directly pass a string
	 */
	changeUrl( e ) {
		if ( STF.Configs.Props.HAS_PUSHSTATE ) { // if pushstate supported
			let url;
			
			if ( typeof e == 'object' ) {
				e.preventDefault();
				
				url = e.currentTarget.href;
			}
			else if ( typeof e == 'string' )
				url = e;
			
			STF.Core.Router.updateUrl( url );
		}
	}
	
	
	updateSearch() {
		if ( !STF.Configs.Config.IS_PROD )
			console.warn( 'You need to override the updateSearch() method from AbstractView in the current page view.' );
	}
	
	
	updateHash() {
		if ( !STF.Configs.Config.IS_PROD )
			console.warn( 'You need to override the updateHash() method from AbstractView in the current page view.' );
	}
	
	
};

