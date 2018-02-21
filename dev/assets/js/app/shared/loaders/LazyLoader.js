

STF.LazyLoader = ( function( window ) {


class LazyLoader extends STF.CustomEvent {
	
	
	constructor( $container, className, parentEl, stackSize, autoInit ) {
		super();
		
		this.$container		= $container;
		this.CLASS_NAME		= className;
		this.PARENT_EL		= parentEl;
		this.STACK_SIZE		= stackSize; // number of images loaded at each loading wave
		
		this.posLoadedImg	= 0;
		this.imgToLazyload	= [];
		this.loaderImg		= null;
		
		if ( autoInit )
			this.init();
	}
	
	
	init() {
		this.initDOM();
		this.initEl();
		this.bindEvents();
		
		this.startLazyload();
	}
	
	
	initDOM() {
		this.$imgToLazyload	= this.$container.find( 'img.' + this.CLASS_NAME );
	}
	
	
	initEl() {
		this.loaderImg = new STF.Loader( false, true );
		
		for ( let i = 0; i < this.$imgToLazyload.length; i++ ) {
			const src = this.$imgToLazyload[ i ].getAttribute( 'data-src' );
			
			if ( this.imgToLazyload.indexOf( src ) < 0 && src != 'preloaded' )
				this.imgToLazyload.push( src );
		}
	}
	
	
	bindEvents() {
		this.loaderImg.bind( this.loaderImg.E.FILE_LOAD, this.onImgLoad, this );
		this.loaderImg.bind( this.loaderImg.E.COMPLETE, this.onImgLoadingComplete, this );
	}
	
	
	unbindEvents() {
		this.loaderImg.unbind( this.loaderImg.E.FILE_LOAD, this.onImgLoad, this );
		this.loaderImg.unbind( this.loaderImg.E.COMPLETE, this.onImgLoadingComplete, this );
	}
	
	
	destroy() {
		this.unbindEvents();
		
		this.loaderImg.destroy();
	}
	
	
	startLazyload() {
		if ( this.imgToLazyload.length === 0 )
			return;
		
		
		const imgToLazyload = this.imgToLazyload.slice( this.posLoadedImg, this.posLoadedImg + this.STACK_SIZE );
		
		// setTimeout( () => {
		this.loaderImg.startLoad( imgToLazyload );
		// }, 1000 );
	}
	
	
	onImgLoad( e ) {
		const $imgs = this.$imgToLazyload.filter( '[ data-src="' + e.item.src + '" ]' );
		
		for ( let i = 0; i < $imgs.length; i++ ) {
			const $img	= $imgs[ i ];
			$img.src	= e.item.src;
			
			$img.offsetHeight; // jshint ignore:line
			$img.setAttribute( 'data-src', 'lazyloaded' );
			
			if ( this.PARENT_EL !== null )
				STF_dom_addClass( $( $imgs[ i ] ).parent( this.PARENT_EL )[0], 'loaded' );
		}
	}
	
	
	onImgLoadingComplete() {
		this.posLoadedImg += this.STACK_SIZE;
		
		if ( this.posLoadedImg < this.imgToLazyload.length )
			this.startLazyload();
		else
			this.onLazyloadCompleted();
	}
	
	
	onLazyloadCompleted() {
		// console.log( '_onLazyloadCompleted:', this.$container );
	}
	
	
}


return LazyLoader;


} ) ( window );

