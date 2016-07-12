<?php



class AbstractContent
{
	
	protected $data = null;
	
	
	public function __construct()
	{
		$this->setData();
	}
	
	
	protected function setData()
	{
		$d				= new stdClass();
		
		$this->data	= $d;
	}
	
	
	public function getData()
	{
		return $this->data;
	}
	
	
	protected function getContent( $id )
	{
		$pagesController	= PagesController::getInstance();
		$pageController		= $pagesController->getPageController();
		$content			= $pageController->getContent();
		
		if ( $id != null && isset( $content[ $id ] ) )
			$content = $content[ $id ];
		
		
		return Helpers::arrayToObject( $content );
	}
	
}



?>