

GTS.Utils = GTS.Utils || {};


GTS.Utils.Global = (function(window){
	
	
	window.getImageSize = function(imgW, imgH, contW, contH) {
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
	
	
})(window);

