

APP.OldBrowser = ( function( window ) {
	
	
	function OldBrowser() {
		
	}
	
	
	OldBrowser.prototype.init = function() {
		var browser			= APP.Config.BROWSER;
		var browserVersion	= APP.Config.BROWSER_VERSION;
		
		if (browser == 'ie'			&& browserVersion < 9 || 
			browser == 'firefox'	&& browserVersion < 10 || 
			browser == 'opera'		&& browserVersion < 11 || 
			browser == 'safari'		&& browserVersion < 5 || 
			browser == 'chrome'		&& browserVersion < 17 ) {
			
			$.ajax( {
				url:		APP.Path.URL.base + APP.Lang.LANG + '/old-browser',
				type:		'POST',
				data:		{
								ajax: 'true',
								type: 'alt'
							},
				dataType:	'html',
				success:	_successAjax.bind(this),
				error:		_errorAjax.bind(this)
			} );
		}
	};
	
	
	var _successAjax = function( data ) {
		APP.MainController.view.$mainCont[0].innerHTML += data;
	};
	
	
	var _errorAjax = function( XMLHttpRequest, textStatus, errorThrows ) {
		// alert('ERROR');
	};
	
	
	return new OldBrowser();
	
	
} ) ( window );

