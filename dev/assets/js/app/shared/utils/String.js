

window.STF_str_removeFirstSpecificChar = ( string, char ) => {
	if ( string.substr( 0, 1 ) == char )
		string = string.substr( 1 );
	
	
	return string;
};


window.STF_str_removeLastSpecificChar = ( string, char ) => {
	if ( string.substr( string.length - 1, 1 ) == char )
		string = string.substr( 0, string.length - 1 );
	
	
	return string;
};


window.STF_str_convertToUrl = ( string ) => {
	const link	= document.createElement( 'a' );
	link.href	= string;
	
	
	return link;
};


window.STF_str_getPath = ( string, baseUrl ) => {
	let path	= string.replace( baseUrl, '' );
	
	path		= path.split( '#' )[0]; // remove #hash
	path		= path.split( '?' )[0]; // remove ?search
	
	path		= STF_str_removeFirstSpecificChar( path, '/' );
	path		= STF_str_removeLastSpecificChar( path, '/' );
	
	
	return path;
};


window.STF_str_getSearch = ( string ) => {
	const url	= STF_str_convertToUrl( string );
	
	let search	= url.search.split( '?' )[1] || '';
	
	search		= STF_str_removeFirstSpecificChar( search, '/' );
	search		= STF_str_removeLastSpecificChar( search, '/' );
	
	
	return search;
};


window.STF_str_getHash = ( string ) => {
	const url	= STF_str_convertToUrl( string );
	
	let hash	= url.hash.split( '#' )[1] || '';
	
	hash		= STF_str_removeFirstSpecificChar( hash, '/' );
	hash		= STF_str_removeLastSpecificChar( hash, '/' );
	
	
	return hash;
};


window.STF_str_getParams = ( string, type ) => {
	const url		= STF_str_convertToUrl( string );
	const params	= {};
	
	if ( url[ type ].length > 1 ) {
		for ( let aItKey, nKeyId = 0, aCouples = url[ type ].substr(1).split( '&' ); nKeyId < aCouples.length; nKeyId++ ) {
			aItKey	= aCouples[ nKeyId ].split( '=' );
			
			let key		= decodeURI( aItKey[0] );
			key			= STF_str_removeFirstSpecificChar( key, '/' );
			key			= STF_str_removeLastSpecificChar( key, '/' );
			
			let value	= aItKey.length > 1 ? decodeURI( aItKey[1] ) : '';
			value		= STF_str_removeFirstSpecificChar( value, '/' );
			value		= STF_str_removeLastSpecificChar( value, '/' );
			
			params[ key ] = value;
		}
	}
	
	
	return params;
};

