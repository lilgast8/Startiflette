

STF.MainView = ( function( window ) {


class MainView extends STF.AbstractMainView {
	
	
	constructor() {
		super();
	}
	
	
	/*initDOM() {
		super.initDOM();
	}*/
	
	
	initEl() {
		super.initEl();
		
		this.disableScrollRestoration();
	}
	
	
	/*bindEvents() {
		super.bindEvents();
	}*/
	
	
	/*initStaticsViews() {
		super.initStaticsViews();
	}*/
	
	
}


return new MainView();


} ) ( window );

