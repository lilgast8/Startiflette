'use strict';


var AbstractPageView	= require( 'desktop/abstracts/views/AbstractPageView' );
// var GlobalUtil			= require( 'shared/utils/Global' );



function LegalNotices() {
	AbstractPageView.call( this );
}


LegalNotices.prototype				= Object.create( AbstractPageView.prototype );
LegalNotices.prototype.constructor	= LegalNotices;


LegalNotices.prototype.initDOM = function() {
	AbstractPageView.prototype.initDOM.call( this );
	
	this.$email	= this.$page.find( '.email' );
	
	// GlobalUtil.encryptMailto( this.$.email, 'contact', 'domain', 'com', true );
};


LegalNotices.prototype.bindEvents = function() {
	AbstractPageView.prototype.bindEvents.call( this );
};


LegalNotices.prototype.unbindEvents = function() {
	AbstractPageView.prototype.unbindEvents.call( this );
};


LegalNotices.prototype.resize = function() {
	
};


module.exports = LegalNotices;

