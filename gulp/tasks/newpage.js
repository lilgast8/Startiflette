var gulp		= require('gulp');

var options		= require( '../utils/options' );

var inquirer	= require( 'inquirer' );



gulp.task( 'newpage', function() {
	
	inquirer.prompt(
		[
			{
				type: 'input',
				name: 'pageName',
				message: 'Name of the new page:',
				default: "My page"
			}
			// ,{
			// 	type: 'input',
			// 	name: 'pageClassName',
			// 	message: 'Name of the CSS class:',
			// 	default: "pageClassName"
			// }
			/*,
			{
				type: 'confirm',
				name: 'moveon',
				message: 'Continue?'
			}*/
		], function( answers ) {
		
		// Use user feedback for... whatever!!
		
		console.log( 'Do string shit!!!', answers );
		
		
		var fileNameLowerCase	= answers.pageName.toLowerCase();
		var fileNameUpperCase	= answers.pageName.toUpperCase();
		var fileNameTitleCase	= toTitleCase ( answers.pageName);
		var dashedFileName		= fileNameLowerCase.replace( ' ', '-' );
		
		
		
		// console.log( fileNameTitleCase );		
		// console.log( fileNameLowerCase, ' — ', dashedFileName );		
		
		
		var cssFileName	= '_' + dashedFileName;
		var phpFileName	= dashedFileName;
		var jsFileName	= fileNameTitleCase.replace( ' ', '' ) + 'View';
		
		
		console.log( cssFileName, '/', phpFileName, '/', jsFileName );
		
		
	});
	
} );


function toTitleCase( string ) {
	return string.replace( /\w\S*/g, function( txt ) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}