

STF.Controllers.PagesController = new class PagesController extends STF.Abstracts.AbstractPagesController {
	
	
	constructor() {
		super();
		
		// this.LOADING_MODE			= null;
		// this.DYNAMIC_IMG_TO_LOAD	= null;
		// this.IS_HIDE_INIT			= null;
	}
	
	
	/*initPages() {
		
	}*/
	
	
	/*managePageHidingTransitions() {
		
	}*/
	
	
	/*checkPageHiding() {
		
	}*/
	
	
	/*managePageShowingTransitions() {
		
	}*/
	
	
	/*AbstractcheckPageShowing() {
		
	}*/
	
	
	manageMenuLinks() {
		this.updateMenuLinks( STF.Views.Statics.Header.$menuLink );
		this.updateMenuLinks( STF.Views.Statics.Footer.$footerLink );
	}
	
	
	manageLangLinks() {
		this.changeLangLinks( STF.Views.Statics.Header.$headerLgLink );
		this.changeLangLinks( STF.Views.Statics.Footer.$footerLgLink );
	}
	
	
}();

