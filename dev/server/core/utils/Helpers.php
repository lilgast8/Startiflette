<?php



class Helpers
{
	
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