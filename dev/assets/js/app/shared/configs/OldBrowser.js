

STF.OldBrowser = ( function( window ) {
	
	
	function OldBrowser() {
		
	}
	
	
	OldBrowser.prototype.init = function() {
		var browser			= STF.Config.BROWSER;
		var browserVersion	= STF.Config.BROWSER_VERSION;
		
		if (browser == 'ie'			&& browserVersion < 9 || 
			browser == 'firefox'	&& browserVersion < 10 || 
			browser == 'opera'		&& browserVersion < 11 || 
			browser == 'safari'		&& browserVersion < 5 || 
			browser == 'chrome'		&& browserVersion < 17 ) {
			
			$.ajax( {
				url:		STF.Path.URL.base + STF.Lang.LANG + '/old-browser',
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
		STF.MainController.view.$mainCont[0].innerHTML += data;
	};
	
	
	var _errorAjax = function( XMLHttpRequest, textStatus, errorThrows ) {
		// alert('ERROR');
	};
	
	
	return new OldBrowser();
	
	
} ) ( window );

