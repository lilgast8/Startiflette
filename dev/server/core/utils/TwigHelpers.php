<?php



class TwigHelpers extends Twig_Extension
{
	
	public function getName()
	{
		return 'TwigHelpers';
	}
	
	
	public function getFunctions()
	{
		return array(
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
		echo $this->getSVG( $name );
	}
	
}



?>