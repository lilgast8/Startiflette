

APP.Utils = APP.Utils || {};


APP.Utils.Global = (function(window){
	
	
	this.color = {};
	
	
	this.removeClass = function(elt, classToRemove) {
		elt.className = elt.className.replace(new RegExp('(^|\\b)' + classToRemove.split(' ').join('|') + '(\\b|$)', 'gi'), '');
		
		var lastCharPos = elt.className.length-1;
		if(elt.className[lastCharPos] == ' ')
			elt.className = elt.className.substring(0, lastCharPos);
	};
	
	
	this.getImageSize = function(imgW, imgH, contW, contH) {
		var imgRatio = imgW/imgH;
		var contRatio = contW/contH;
		var sizeImg = {
			x : 0,
			y : 0,
			w : 0,
			h : 0
		};
		
		if(imgRatio < contRatio) {
			sizeImg.w = contW;
			sizeImg.h = Math.round(sizeImg.w/imgRatio);
			sizeImg.y = Math.round(-(sizeImg.h-contH)/2);
		} else {
			sizeImg.h = contH;
			sizeImg.w = Math.round(sizeImg.h*imgRatio);
			sizeImg.x = Math.round(-(sizeImg.w-contW)/2);
		}
		
		return sizeImg;
	};
	
	
	this.degToRad = function(deg) {
		return deg*Math.PI/180;
	};
	
	
})(window);

