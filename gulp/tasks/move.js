var gulp	= require( 'gulp' );

var options	= require( '../utils/options' );
var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );



gulp.task( 'move', function() {
	
	/* Prod */
	if ( options.movePath === null && options.task == 'prod' ) {
		
		var imgPathFrom;
		
		if ( options.imageMin )
			imgPathFrom = [];
		else
			imgPathFrom = [
				paths.env.dev + paths.assets.img.allFiles,
				'!' + paths.env.dev + paths.emptyFiles
			];
		
		
		options.movePath = {
			from: [
				[ paths.env.dev + paths.assets.css.minAllFiles ],
				[
					paths.env.dev + paths.assets.css.fonts.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				],
				[
					paths.env.dev + paths.assets.favicons.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				],
				[
					paths.env.dev + paths.assets.files.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				],
				imgPathFrom,
				[ paths.env.dev + paths.assets.js.vendor.HTML5ShivFile ],
				[
					paths.env.dev + paths.assets.sounds.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				],
				[
					paths.env.dev + paths.assets.svg.sprite.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				],
				[
					paths.env.dev + paths.assets.videos.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				],
				[ paths.env.dev + paths.server.indexFile ],
				[
					paths.env.dev + paths.server.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [
				paths.env.prod + paths.assets.css.dir,
				paths.env.prod + paths.assets.css.fonts.dir,
				paths.env.prod + paths.assets.favicons.dir,
				paths.env.prod + paths.assets.files.dir,
				paths.env.prod + paths.assets.img.dir,
				paths.env.prod + paths.assets.js.vendor.dir,
				paths.env.prod + paths.assets.sounds.dir,
				paths.env.prod + paths.assets.svg.sprite.dir,
				paths.env.prod + paths.assets.videos.dir,
				paths.env.prod,
				paths.env.prod + paths.server.dir
			]
		};
	}
	
	
	/* SASS */
	else if ( options.movePath === null && options.task == 'sass' )
		options.movePath = {
			from: [
				[ paths.env.dev + paths.assets.css.minAllFiles ],
				[
					paths.env.dev + paths.assets.css.fonts.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [
				paths.env.prod + paths.assets.css.dir,
				paths.env.prod + paths.assets.css.fonts.dir
			]
		};
	
	
	/* Favicons */
	else if ( options.movePath === null && options.task == 'favicons' )
		options.movePath = {
			from: [
				[
					paths.env.dev + paths.assets.favicons.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [ paths.env.prod + paths.assets.favicons.dir ]
		};
	
	
	/* Files */
	else if ( options.movePath === null && options.task == 'files' )
		options.movePath = {
			from: [
				[
					paths.env.dev + paths.assets.files.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [ paths.env.prod + paths.assets.files.dir ]
		};
	
	
	/* JS & JS-min */
	else if ( options.movePath === null && ( options.task == 'js' || options.task == 'js-min' ) )
		options.movePath = {
			from: [ paths.env.dev + paths.assets.js.vendor.HTML5ShivFile ],
			to: [ paths.env.prod + paths.assets.js.vendor.dir ]
		};
	
	
	/* SVG */
	else if ( options.movePath === null && options.task == 'svg' && options.env != 'dev' )
		options.movePath = {
			from: [ paths.env.dev + paths.assets.svg.sprite.allFiles ],
			to: [ paths.env.prod + paths.assets.svg.sprite.dir ]
		};
	
	
	/* Image */
	else if ( options.movePath === null && ( options.task == 'image' || options.task == 'image-min' || options.task == 'image-move' ) )
		options.movePath = {
			from: [
				[
					paths.env.dev + paths.assets.img.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [ paths.env.prod + paths.assets.img.dir ]
		};
	
	
	/* Sounds */
	else if ( options.movePath === null && options.task == 'sounds' )
		options.movePath = {
			from: [
				[
					paths.env.dev + paths.assets.sounds.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [ paths.env.prod + paths.assets.sounds.dir ]
		};
	
	
	/* Videos */
	else if ( options.movePath === null && options.task == 'videos' )
		options.movePath = {
			from: [
				[
					paths.env.dev + paths.assets.videos.allFiles,
					'!' + paths.env.dev + paths.emptyFiles
				]
			],
			to: [ paths.env.prod + paths.assets.videos.dir ]
		};
	
	
	/* Server */
	else if ( options.movePath === null && options.task == 'server' )
		options.movePath = {
			from: [
				[
					paths.env.dev + paths.server.allFiles,
					'!' + paths.env.dev + paths.emptyFiles,
				],
				[ paths.env.dev + paths.server.indexFile ]
			],
			to: [
				paths.env.prod + paths.server.dir,
				paths.env.prod
			]
		};
	
	
	
	if ( options.movePath !== null ) {
		for ( var i = 0; i < options.movePath.from.length; i++ ) {
			
			gulp.src( options.movePath.from[i] )
				.pipe( plumber() )
				.pipe( gulp.dest( options.movePath.to[i] ) );
			
		}
	}
	
} );