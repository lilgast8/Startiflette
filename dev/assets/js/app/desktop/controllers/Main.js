

STF.Controllers.Main = new class Main extends STF.Abstracts.AbstractMain {
	
	
	constructor() {
		super();
	}
	
	
	/*initDOM() {
		super.initDOM();
	}*/
	
	
	initEl() {
		super.initEl();
		
		STF.Controllers.Scroll.disableScrollRestoration();
	}
	
	
	/*bindEvents() {
		super.bindEvents();
	}*/
	
	
	/*initStaticViews() {
		super.initStaticViews();
	}*/
	
	
}();

