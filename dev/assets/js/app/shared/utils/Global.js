

window.STF_gl_colors = {};


window.STF_gl_encryptMailto = ( el, address, domain, ext, replaceContent ) => {
	const className	= el.className;
	const mailto	= 'mailto';
	const separator	= ':';
	const at		= '@';
	const dot		= '.';
	
	const content	= replaceContent ? address + at + domain + dot + ext : el.innerHTML;
	const email		= mailto + separator + address + at + domain + dot + ext;
	
	el.outerHTML	= '<a href="' + email + '" class="' + className + '">' + content + '</a>';
};


window.STF_gl_getObjSize = ( obj ) => {
	let size = 0;
	
	for ( const key in obj )
		if ( obj.hasOwnProperty( key ) )
			size++;
	
	
	return size;
};


window.STF_gl_getType = ( obj ) => {
	return ( {} ).toString.call( obj ).match( /\s([a-z|A-Z]+)/ )[1].toLowerCase();
};

