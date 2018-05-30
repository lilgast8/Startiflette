

STF.Views.Pages.Home = class Home extends STF.Abstracts.AbstractPageView {
	
	
	constructor() {
		super();
	}
	
	
	init() {
		super.init();
		
		this.initView = true;
		
		console.log( STF.Models.Assets.json.home );
		// console.log( STF.Models.Assets.json.home.home2 );
		
		STF.Models.Assets.resetJsonData( 'home', 'home1' );
	}
	
	
	bindEvents() {
		super.bindEvents();
	}
	
	
	unbindEvents() {
		super.unbindEvents();
	}
	
	
	resize() {
		
	}
	
	
};

