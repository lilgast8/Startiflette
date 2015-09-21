<?php



class AltContent
{
	
	
	public function getDatas()
	{
		$alt = new stdClass();
		
		
		$alt->noJS = new stdClass();
		
		$alt->noJS->title	= "JavaScript is disabled.";
		$alt->noJS->desc	= "To view this web page, please enable JavaScript in your browser preferences. <br/>Once Javascript is enabled, please reload the web page.";
		
		
		$alt->oldB = new stdClass();
		
		$alt->oldB->title		= "Your browser is obsolete.";
		$alt->oldB->desc		= "Please upgrade it for free to improve its performance <br />and so have a better comfort of browsing.";
		$alt->oldB->download	= "Download";
		
		
		
		return $alt;
	}
	
}



?>