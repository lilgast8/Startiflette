

STF.AbstractPageView = ( function( window ) {


class AbstractPageView extends STF.AbstractView {
	
	
	constructor() {
		super();
		
		this.imgToLazyloadClassName	= 'img-lazyload'; // class name of images to lazyload
		this.lazyloadParentEl		= null; // selector of parent of images to lazyload
	}
	
	
	initDOM() {
		// console.log( 'AbstractPageView.initDOM() — ', this.constructor.name );
		
		this.$page = $( document.getElementById( 'page' ) );
	}
	
	
	initEl() {
		// console.log( 'AbstractPageView.initEl() — ', this.constructor.name );
		
		this.lazyLoader = new STF.LazyLoader( this.$page, this.imgToLazyloadClassName, this.lazyloadParentEl, 1, true );
	}
	
	
	/*initTl() {
		
	}*/
	
	
	show() {
		this.dispatch( this.E.SHOWN );
	}
	
	
	hide() {
		this.dispatch( this.E.HIDDEN );
	}
	
	
	destroy() {
		super.destroy();
		
		if ( this.lazyLoader !== undefined )
			this.lazyLoader.destroy();
	}
	
	
	/*onPageShown() {
		
	}*/
	
	
	/*onPageHidden() {
		
	}*/
	
	
}


return AbstractPageView;


} ) ( window );

