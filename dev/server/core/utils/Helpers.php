<?php



class Helpers
{
	
	public static function titleCase( $string )
	{
		$string	= str_replace( '-', ' ', $string );
		$string	= str_replace( '_', ' ', $string );
		$string	= ucwords( $string );
		$string	= str_replace( ' ', '', $string );
		
		return $string;
	}
	
	
	public static function getSVG( $name )
	{
		$html = '';
		
		$html .= '<svg class="icon icon-' . $name . '">';
		$html .= '	<use xlink:href="#' . $name . '" />';
		$html .= '</svg>';
		
		return $html;
	}
	
	
	public static function echoSVG( $name )
	{
		echo Helpers::getSVG( $name );
	}
	
}



?>