/*
 * DC jQuery Spamless - jQuery Spamless
 * Copyright (c) 2011 Design Chemical
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */

(function($){

	//define the new for the plugin ans how to call it
	$.fn.dcSpamless = function(options) {

		//set default options
		var defaults = {
			reverse: true, 	// level of obfuscation
			splitDomain: '[dot]', // characters used to replace '.'
			splitName: '[at]', // characters used to replace '@'
			mailto: true 	// adds mailto link
		};

		//call in the default otions
		var options = $.extend(defaults, options);
		
		return this.each(function(options){

			var domain = defaults.splitDomain, name = defaults.splitName;
			
			// replace characters
			var email = $(this).is('a') ? 
			$(this).attr('href').replace('mailto:', '').replace(domain, '.').replace(name, '@') :
			$(this).text().replace(domain, '.').replace(name, '@');
			
			// reverse
			email = defaults.reverse == true ? email.split('').reverse().join('') : email ;
			
			if($(this).is('a')){
				$(this).attr('href','mailto:'+email);
			} else {
				if(defaults.mailto == true){
					email = '<a href="mailto:'+email+'">'+email+'</a>';
				}
				$(this).html(email);
			}
		});
	};
})(Zepto);