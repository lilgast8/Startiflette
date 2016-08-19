<?php



class Strings
{
	
	public static function titleCase( $string )
	{
		$string	= str_replace( '-', ' ', $string );
		$string	= str_replace( '_', ' ', $string );
		$string	= ucwords( $string );
		$string	= str_replace( ' ', '', $string );
		
		return $string;
	}
	
	
	public static function camelCase( $string )
	{
		$string	= Strings::titleCase( $string );
		$string = lcfirst( $string );
		
		return $string;
	}
	
	
	public static function removeFirstSpecificChar( $string, $char )
	{
		if ( substr( $string, 0, 1 ) == $char )
			$string = substr( $string, 1 );
		
		
		return $string;
	}
	
	
	public static function removeLastSpecificChar( $string, $char )
	{
		if ( substr( $string, -1 ) == $char )
			$string = substr( $string, 0, -1 );
		
		
		return $string;
	}
	
}



?>