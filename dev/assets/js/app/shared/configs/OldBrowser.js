

STF.OldBrowser = ( function( window ) {
	'use strict';
	
	
	function OldBrowser() {
		
	}
	
	
	OldBrowser.prototype.init = function() {
		var browser			= STF.Config.BROWSER;
		var browserVersion	= STF.Config.BROWSER_VERSION;
		
		if (browser == 'ie'			&& browserVersion < 10 || 
			browser == 'firefox'	&& browserVersion < 35 || 
			browser == 'opera'		&& browserVersion < 30 || 
			browser == 'safari'		&& browserVersion < 7 || 
			browser == 'chrome'		&& browserVersion < 30 ) {
			
			$.ajax( {
				url:		STF.Path.URL.base + STF.Lang.LANG + '/old-browser',
				type:		'POST',
				data:		{
								ajax: 'true',
								type: 'oldBrowser'
							},
				dataType:	'html',
				success:	_successAjax.bind(this),
				error:		_errorAjax.bind(this)
			} );
		}
	};
	
	
	var _successAjax = function( data ) {
		STF.MainView.$mainCont[0].innerHTML += data;
	};
	
	
	var _errorAjax = function( XMLHttpRequest, textStatus, errorThrows ) {
		// alert('ERROR');
	};
	
	
	return new OldBrowser();
	
	
} ) ( window );

