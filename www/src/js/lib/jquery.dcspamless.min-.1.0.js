// jQuery Spamless //
(function($){$.fn.dcSpamless=function(options){var defaults={reverse:true,splitDomain:'[dot]',splitName:'[at]',mailto:true};var options=$.extend(defaults,options);return this.each(function(options){var domain=defaults.splitDomain,name=defaults.splitName;var email=$(this).is('a')?$(this).attr('href').replace('mailto:','').replace(domain,'.').replace(name,'@'):$(this).text().replace(domain,'.').replace(name,'@');email=defaults.reverse == true?email.split('').reverse().join(''):email;if($(this).is('a')){$(this).attr('href','mailto:'+email)}else{if(defaults.mailto==true){email='<a href="mailto:'+email+'">'+email+'</a>'}$(this).html(email)}})}})(jQuery);