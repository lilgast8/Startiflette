<?php



class Helpers
{
	
	static function arrayToObject( $array )
	{
		return is_array( $array ) ? (object) array_map( __METHOD__, $array ) : $array;
	}
	
}



?>