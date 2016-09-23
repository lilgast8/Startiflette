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
	
	
	/**
	 * Get a content who is already defined
	 * @params {string} $id: useful when you are in a view and you want to get a var
	 *						 who is already defined before in another view
	 */
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