'use strict';



function Global() {
	this.color = {};
}


Global.prototype.encryptMailto = function( el, address, domain, end, replaceContent ) {
	var className	= el.className;
	var mailto		= 'mailto';
	var separator	= ':';
	var at			= '@';
	var dot			= '.';
	
	var content		= replaceContent ? address + at + domain + dot + end : el.innerHTML;
	var email		= mailto + separator + address + at + domain + dot + end;
	
	el.outerHTML	= '<a href="' + email + '" class="' + className + '">' + content + '</a>';
};


Global.prototype.getObjSize = function( obj ) {
	var size = 0;
	
	for ( var key in obj )
		if ( obj.hasOwnProperty( key ) )
			size++;
	
	
	return size;
};


Global.prototype.getType = function( obj ) {
	return ({}).toString.call( obj ).match( /\s([a-z|A-Z]+)/ )[1].toLowerCase();
};


module.exports = new Global();

