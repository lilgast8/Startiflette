<?php



class PagesController
{
	
	protected static $instance;
	
	static $PAGE = null;
	
	
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
	
	
	public function setPageInfos( $pageId, $phpView, $title, $desc )
	{
		self::$PAGE = new stdClass();
		
		self::$PAGE->id			= $pageId;
		self::$PAGE->phpView	= $phpView;
		self::$PAGE->title		= $title;
		self::$PAGE->desc		= $desc;
	}
	
}



?>