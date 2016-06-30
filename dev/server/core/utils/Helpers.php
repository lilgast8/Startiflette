<?php



// namespace stf\core\utils;

// use server\vendor\Twig\Extension;



class Helpers extends Twig_Extension
{
	
	public function getName()
	{
		return 'Helpers';
	}
	
	
	public function getFunctions()
	{
		return array(
			// new \Twig_SimpleFunction( 'myFunc', array( $this, 'myFunc' ) ),
			new Twig_SimpleFunction( 'getSVG', array( $this, 'getSVG' ) ),
			new Twig_SimpleFunction( 'echoSVG', array( $this, 'echoSVG' ) ),
		);
	}
	
	
	public function getSVG( $name )
	{
		$html = '';
		
		$html .= '<svg class="icon icon-' . $name . '">';
		$html .= '	<use xlink:href="#' . $name . '" />';
		$html .= '</svg>';
		
		return $html;
	}
	
	
	public function echoSVG( $name )
	{
		echo Helpers::getSVG( $name );
	}
	
}



?>