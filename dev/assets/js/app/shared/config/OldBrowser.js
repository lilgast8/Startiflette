

APP.OldBrowser = (function(window) {
	
	
	function OldBrowser() {
		
	}
	
	
	OldBrowser.prototype.init = function() {
		var browser = APP.Config.BROWSER;
		var browserVersion = _getBrowserVersion.call(this, APP.Config.BROWSER_VERSION);
		
		if(browser == 'ie' && browserVersion < 9 || 
			browser == 'firefox' && browserVersion < 10 || 
			browser == 'opera' && browserVersion < 11 || 
			browser == 'safari' && browserVersion < 5 || 
			browser == 'chrome' && browserVersion < 17) {
			
			$.ajax({
				url: APP.Config.WEB_ROOT + APP.Config.LANG + '/ajax-content/alt-content/old-browser',
				type: 'POST',
				dataType: 'html',
				success: _successAjax.bind(this),
				error: _errorAjax.bind(this)
			});
		}
	};
	
	
	var _getBrowserVersion = function(browserVersion) {
		var firstPointPos = browserVersion.indexOf('.');
		
		var aBrowserVersion = APP.Config.BROWSER_VERSION.split('.');
		
		browserVersion = '';
		
		for(var i=0; i<aBrowserVersion.length; i++) {
			browserVersion += aBrowserVersion[i];
		}
		
		browserVersion = parseFloat( browserVersion.slice(0, firstPointPos) + '.' + browserVersion.slice(firstPointPos, browserVersion.length) );
		
		return browserVersion;
	};
	
	
	var _successAjax = function(data) {
		APP.Main.$.mainContainer[0].innerHTML += data;
	};
	
	
	var _errorAjax = function(XMLHttpRequest, textStatus, errorThrows) {
	//	alert('ERROR');
	};
	
	
	return new OldBrowser();
	
	
})(window);

