

STF.Views.Pages.Projects = class Projects extends STF.Abstracts.AbstractPageView {
	
	
	constructor() {
		super();
	}
	
	
	initDOM() {
		super.initDOM();
		
		this.$projectLink = this.$page.find( '.project-link' );
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
	
	
};

