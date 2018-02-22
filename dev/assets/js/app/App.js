

STF.App = new class App {
	
	
	constructor() {
		
	}
	
	
	init() {
		STF.Configs.Config.init();
		STF.Configs.Props.init();
		STF.Configs.Device.init();
		STF.Configs.Path.init();
		STF.Configs.Lang.init();
		
		STF.Utils.Debug.DebugController.init( false, false, false );
		
		STF.Controllers.PagesController.init();
		STF.Controllers.Main.init();
		STF.Controllers.Router.init();
	}
	
	
}();


$( STF.App.init() );

