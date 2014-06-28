

APP.OldBrowser = APP.OldBrowser || {};


(function(window) {
	
	
	var OldBrowser = function () {
		
	};
	
	
	OldBrowser.prototype = {
		
		init : function() {
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
		}
		
	};
	
	
	var _successAjax = function(data) {
		APP.Main.$.mainContainer.append(data);
	};
	
	
	var _errorAjax = function(XMLHttpRequest, textStatus, errorThrows) {
	//	alert('ERROR');
	};
	
	
	APP.OldBrowser = new OldBrowser();
	
	
})(window);

