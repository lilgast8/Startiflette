

STF.Views		= STF.Views || {};
STF.Views.Pages	= STF.Views.Pages || {};


STF.Views.Pages.Projects = ( function( window ) {


class Projects extends STF.AbstractPageView {
	
	
	constructor() {
		super();
	}
	
	
	initDOM() {
		super.initDOM();
		
		this.$projectLink = this.$page.find( '.proj-link' );
	}
	
	
	bindEvents() {
		super.bindEvents();
		
		this.$projectLink.on( 'click', $.proxy( this.changeUrl, this ) );
	}
	
	
	unbindEvents() {
		super.unbindEvents();
		
		this.$projectLink.off( 'click', $.proxy( this.changeUrl, this ) );
	}
	
	
	resize() {
		
	}
	
	
}


return Projects;


} ) ( window );

