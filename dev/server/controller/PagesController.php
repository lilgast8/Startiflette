<?php



class PagesController
{
	
	protected static $instance;
	
	static $PHP_VIEW		= null;
	static $TITLE			= null;
	static $DESC			= null;
	
	// private $path			= null;
	
	// private $pageId			= null;
	// private $pageParams		= null;
	
	// private $is404			= null;
	// private $isHomepage		= null;
	
	
	protected function __construct()
	{
		
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	public static function getInstance()
	{
		if ( !isset(self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
}



?>