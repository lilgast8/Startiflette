<?php



class Contents
{
	
	protected static $instance;
	
	static $datas = null;
	
	
	protected function __construct()
	{
		$this->setContentsConfig();
		$this->setDatas();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	private function setContentsConfig()
	{
		$this->contentsConfig = new stdClass();
		
		if ( !file_exists( Path::$FILE->contentsFile ) )
			throw new ErrorException( 'Content infos file is missing!' );
		
		$this->contentsConfig	= file_get_contents( Path::$FILE->contentsFile );
		$this->contentsConfig	= json_decode( $this->contentsConfig );
	}
	
	
	private function setDatas()
	{
		self::$datas = new stdClass();
		
		
		/* first load */
		if ( Router::$CONTENT_TYPE == 'firstLoad' ) {
			
			foreach ( $this->contentsConfig as $contentId => $contentsInfos ) {
				
				if ( $contentId != 'page' ) { // alt, static, partial...
					$fileName	= $contentsInfos->fileName;
					$className	= $contentsInfos->className;
					$id			= $contentId;
				}
				else { // pages
					$fileName	= PagesController::$PAGE_INFOS->phpView;
					$className	= $this->contentsConfig->page->{ PagesController::$PAGE_INFOS->id }->className;
					$id			= PagesController::$PAGE_INFOS->id;
				}
				
				$this->getDatas( $contentId, $fileName, $className, $id );
				
			}
			
		}
		
		/* page change load */
		else if ( Router::$CONTENT_TYPE == 'pageChange' ) {
			// get partial datas
			$id			= 'partial';
			$fileName	= $this->contentsConfig->{ $id }->fileName;
			$className	= $this->contentsConfig->{ $id }->className;
			
			$this->getDatas( 'partial', $fileName, $className, $id );
			
			
			// get page datas
			$fileName	= PagesController::$PAGE_INFOS->phpView;
			$className	= $this->contentsConfig->page->{ PagesController::$PAGE_INFOS->id }->className;
			$id			= PagesController::$PAGE_INFOS->id;
			
			$this->getDatas( 'page', $fileName, $className, $id );
		}
	}
	
	
	private function getDatas( $fileType, $fileName, $className, $id )
	{
		$dirFile = $fileType == 'page' ? 'pages/' : '';
		
		$langFilePath = Path::$FILE->contents . Lang::$LANG . '/' . $dirFile . $fileName . '.php';
		
		if ( !file_exists( $langFilePath ) )
			include_once Path::$FILE->contents . 'global/' . $dirFile . $fileName . '.php';
		else
			include_once $langFilePath;
		
		$class					= new $className();
		self::$datas->{ $id }	= $class->getDatas();
	}
	
}



?>