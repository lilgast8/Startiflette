

APP.Utils = APP.Utils || {};


APP.Utils.Global = (function(window){
	
	
	this.color = {};
	
	
	this.addClass = function(elt, classToAdd){
		if(elt.classList)
			elt.classList.add(classToAdd);
		else
			elt.className += ' ' + classToAdd;
	};
	
	
	this.removeClass = function(elt, classToRemove) {
		if(elt.classList)
			elt.classList.remove(classToRemove);
		else {
			elt.className = elt.className.replace(new RegExp('(^|\\b)' + classToRemove.split(' ').join('|') + '(\\b|$)', 'gi'), '');
			
			var lastCharPos = elt.className.length-1;
			if(elt.className[lastCharPos] == ' ')
				elt.className = elt.className.substring(0, lastCharPos);
		}
	};
	
	
	this.hasClass = function(elt, classToCheck) {
		var hasClass;
		
		if(elt.classList)
			hasClass = elt.classList.contains(classToCheck);
		else
			hasClass = new RegExp('(^| )' + classToCheck + '( |$)', 'gi').test(elt.className);
		
		return hasClass;
	};
	
	
	this.resetStyle = function(elt){
		elt.style.cssText = '';
	};
	
	
	this.getEltSize = function(eltW, eltH, contW, contH) {
		var imgRatio = eltW/eltW;
		var contRatio = contW/contH;
		var sizeElt = {
			x : 0,
			y : 0,
			w : 0,
			h : 0
		};
		
		if(eltRatio < contRatio) {
			sizeElt.w = contW;
			sizeElt.h = Math.round(sizeElt.w/eltRatio);
			sizeElt.y = Math.round(-(sizeElt.h-contH)/2);
		} else {
			sizeElt.h = contH;
			sizeElt.w = Math.round(sizeElt.h*eltRatio);
			sizeElt.x = Math.round(-(sizeElt.w-contW)/2);
		}
		
		return sizeElt;
	};
	
	
	this.degToRad = function(deg) {
		return deg*Math.PI/180;
	};
	
	
	this.radToDeg = function(rad) {
		return rad*180/Math.PI;
	};
	
	
	this.getSupportedPropertyName = function(property) {
		var prefixes = ['', 'ms', 'Webkit', 'Moz', 'O'];
		
		for(var i = 0; i < prefixes.length; i++) {
			var prefix = prefixes[i];
			property = prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase();
			var prop = prefix+property;
			
			if(typeof document.body.style[prop] != "undefined")
				return prop;
		}
		
		return null;
	};
	
	
	this.initMailto = function(elt, address, domain, end) {
		var mailto = 'mailto';
		var separator = ':';
		var at = '@';
		var dot = '.';
		
		elt.href = mailto+separator+address+at+domain+dot+end;
	};
	
	
})(window);

