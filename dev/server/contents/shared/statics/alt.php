<?php



class AltContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->noJS		= new stdClass();
		
		$d->noJS->title	= "JavaScript is disabled.";
		$d->noJS->desc	= "To view this web page, please enable JavaScript in your browser preferences. <br/>Once Javascript is enabled, please reload the web page.";
		
		
		$d->oldB		= new stdClass();
		
		$d->oldB->title	= "Your browser is obsolete.";
		$d->oldB->desc	= "Please upgrade it for free to improve its performance <br />and so have a better comfort of browsing.";
		$d->oldB->dl	= "Download";
		
		
		
		$this->data = $d;
	}
	
}



?>