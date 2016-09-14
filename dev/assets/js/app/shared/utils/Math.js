

STF.Utils = STF.Utils || {};


STF.Utils.Math = ( function( window ) {
	'use strict';
	
	
	window.STF_math_getElPos = function( elW, elH, contW, contH ) {
		var elRatio		= elW / elH;
		var contRatio	= contW / contH;
		var pos			= {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};
		
		if ( elRatio < contRatio ) {
			pos.w = contW;
			pos.h = Math.round( pos.w / elRatio );
			pos.y = Math.round( - ( pos.h - contH ) / 2 );
		}
		else {
			pos.h = contH;
			pos.w = Math.round ( pos.h * elRatio );
			pos.x = Math.round ( - ( pos.w - contW ) / 2 );
		}
		
		return pos;
	};
	
	
	window.STF_math_getCropPos = function( elW, elH, contW, contH ) {
		var elRatio		= elW / elH;
		var contRatio	= contW / contH;
		var pos			= {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};
		
		if ( elRatio < contRatio ) {
			pos.w = elW;
			pos.h = Math.round( pos.w / contRatio );
			pos.y = Math.round( - ( pos.h - elH ) / 2 );
		}
		else {
			pos.h = elH;
			pos.w = Math.round ( pos.h * contRatio );
			pos.x = Math.round ( - ( pos.w - elW ) / 2 );
		}
		
		return pos;
	};
	
	
	window.STF_math_degToRad = function( deg ) {
		return deg * Math.PI / 180;
	};
	
	
	window.STF_math_radToDeg = function( rad ) {
		return rad * 180 / Math.PI;
	};
	
	
	window.STF_math_getHypotenuse = function( widthA, widthB ) {
		return Math.sqrt( widthA * widthA + widthB * widthB );
	};
	
	
	window.STF_math_getInertia = function( destValue, value, inertia ) {
		var valueToAdd	= Math.abs ( ( destValue - value ) * inertia ) >= 0.01 ? ( destValue - value ) * inertia : destValue - value;
		value			+= valueToAdd;
		
		return value;
	};
	
	
} ) ( window );

