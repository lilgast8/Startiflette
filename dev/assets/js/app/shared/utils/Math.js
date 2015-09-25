

STF.Utils = STF.Utils || {};


STF.Utils.Math = ( function( window ) {
	'use strict';
	
	
	window.getElSize = function( elW, elH, contW, contH ) {
		var elRatio		= elW / elH;
		var contRatio	= contW / contH;
		var sizeEl		= {
			x : 0,
			y : 0,
			w : 0,
			h : 0
		};
		
		if ( elRatio < contRatio ) {
			sizeEl.w = contW;
			sizeEl.h = Math.round( sizeEl.w / elRatio );
			sizeEl.y = Math.round( - ( sizeEl.h - contH ) / 2 );
		}
		else {
			sizeEl.h = contH;
			sizeEl.w = Math.round ( sizeEl.h * elRatio );
			sizeEl.x = Math.round ( - ( sizeEl.w - contW ) / 2 );
		}
		
		return sizeEl;
	};
	
	
	window.degToRad = function( deg ) {
		return deg * Math.PI / 180;
	};
	
	
	window.radToDeg = function( rad ) {
		return rad * 180 / Math.PI;
	};
	
	
	window.getHypotenuse = function( widthA, widthB ) {
		return Math.sqrt( widthA * widthA + widthB * widthB );
	};
	
	
} ) ( window );

