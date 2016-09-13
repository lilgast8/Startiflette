var paths		= require( '../utils/paths' );



var image		= {};

image.min		= true;

image.params	= [
	{
		src: [
			paths.env.dev + paths.assets.img.allFiles,
			'!' + paths.env.dev + paths.emptyFiles
		],
		dest: null,
		quality: {
			min: 80,
			max: 80
		}
	}
];



module.exports = image;