var gulp		= require( 'gulp' );

var options		= require('../utils/options' );
var paths		= require( '../utils/paths' );

var plumber		= require( 'gulp-plumber' );
var notify		= require( 'gulp-notify' );
var sass		= require( 'gulp-ruby-sass' );
var rename		= require( 'gulp-rename' );
var livereload	= require( 'gulp-livereload' );



gulp.task( 'sass', function() {
	
	for( var i = 0; i < options.sourcesPath.length; i++ ) {
		
		gulp.src( options.sourcesPath[i] )
			.pipe( plumber() )
			.pipe( sass({
				style: 'compressed',
				// style: 'expanded',
				compass: true
			}) )
			.on( 'error', function(error) {
				console.log(error.message);
				return notify().write( options.device + ': ' + path.basename( error.message ) );
			} )
			.pipe( rename(options.assetsPath[i]) )
			.pipe( gulp.dest(paths.assets.css) )
			.pipe( livereload() );
		
	}
	
	
	
	// gulp.src(options.sourcesPath)
	// 	.pipe(plumber())
	// 	.pipe(sass({
	// 		style: 'compressed',
	// 	//	style: 'expanded',
	// 		compass: true
	// 	}))
	// 	.on('error', function(error) {
	// 		console.log(error.message);
	// 		return notify().write(options.device+': '+path.basename(error.message));
	// 	})
	// 	.pipe(rename(options.assetsPath))
	// 	.pipe(gulp.dest(paths.assets.css))
	// 	.pipe(livereload());
	
	
	
	
	// var src, outputName;
	
	// /* desktop */
	// if(options.device == 'desktop') {
	// 	src = [paths.src.cssFileDesktop];
	// 	outputName = 'styles-desktop.min.css';
	// }
	// /* mobile */
	// else if(options.device == 'mobile') {
	// 	src = [paths.src.cssFileMobile];
	// 	outputName = 'styles-mobile.min.css';
	// }
	
	
	// gulp.src(src)
	// 	.pipe(plumber())
	// 	.pipe(sass({
	// 		style: 'compressed',
	// 	//	style: 'expanded',
	// 		compass: true
	// 	}))
	// 	.on('error', function(error) {
	// 		console.log(error.message);
	// 		return notify().write(options.device+': '+path.basename(error.message));
	// 	})
	// //	.pipe(rename(outputName))
	// 	.pipe(gulp.dest(paths.assets.css))
	// 	.pipe(livereload());
	
	
	
	
	
	// gulp.src(paths.src.css+'styles.scss')
	// 	.pipe(plumber())
	// 	.pipe(sass({
	// 		style: 'compressed',
	// 	//	style: 'expanded',
	// 		compass: true
	// 	}))
	// 	.on('error', function(error) {
	// 		console.log(error.message);
	// 		return notify().write(error.message);
	// 	})
	// 	.pipe(rename('styles.min.css'))
	// 	.pipe(gulp.dest(paths.assets.css));
	
});