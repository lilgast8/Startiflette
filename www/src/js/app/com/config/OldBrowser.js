

APP.OldBrowser = (function(window) {
	
	
	function OldBrowser() {
		
	}
	
	
	OldBrowser.prototype.init = function() {
		var br = APP.Config.BROWSER;
		var brV = parseInt(APP.Config.BROWSER_VERSION);
		
		if( br == 'ie' && brV < 9 || 
			br == 'firefox' && brV < 10 || 
			br == 'opera' && brV < 11 || 
			br == 'safari' && brV < 4 || 
			br == 'chrome' && brV < 17) {
			
			$.ajax({
				url: APP.Config.WEB_ROOT+APP.Config.LG+'/old-browser',
				type: 'POST',
				dataType: 'html',
				success: _successAjax.bind(this),
				error: _errorAjax.bind(this)
			});
		}
	};
	
	
	var _successAjax = function(data) {
		APP.Main.$.mainContainer[0].innerHTML += data;
	};
	
	
	var _errorAjax = function(XMLHttpRequest, textStatus, errorThrows) {
	//	alert('ERROR');
	};
	
	
	return new OldBrowser();
	
	
})(window);

