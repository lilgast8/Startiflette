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
		
		
		// first load
		if ( Router::$CONTENT_TYPE == 'firstLoad' ) {
			
			foreach ( $this->contentsConfig as $id => $contentsInfos ) {
				
				if ( $id != 'pages' ) { // alt, global...
					$fileName	= $contentsInfos->fileName;
					$className	= $contentsInfos->className;
				}
				else { // pages
					$fileName	= PagesController::$PAGE->phpView;
					$className	= $this->contentsConfig->pages->{ PagesController::$PAGE->id }->className;
					$id			= PagesController::$PAGE->id;
				}
				
				$this->getDatas( $fileName, $className, $id );
				
			}
			
		}
		
		// page change load
		else if ( Router::$CONTENT_TYPE == 'pageChange' ) {
			echo 'PAGE CHANGE';
			
			$fileName	= PagesController::$PAGE->phpView;
			$className	= $this->contentsConfig->pages->{ PagesController::$PAGE->id }->className;
			$id			= PagesController::$PAGE->id;
			
			$this->getDatas( $fileName, $className, $id );
		}
		
		
		/*
		foreach ( $this->contentsConfig as $id => $contentsInfos ) {
			if ( $id != 'pages' ) { // alt, global...
				$fileName	= $contentsInfos->fileName;
				$className	= $contentsInfos->className;
			}
			else { // pages
				$fileName	= PagesController::$PAGE->phpView;
				$className	= $this->contentsConfig->pages->{ PagesController::$PAGE->id }->className;
				$id			= PagesController::$PAGE->id;
			}
			
			$this->getDatas( $fileName, $className, $id );
			
			// $langFilePath = Path::$FILE->contents . Lang::$LANG . '/' . $fileName . '.php';
			
			// if ( !file_exists( $langFilePath ) )
			// 	include_once Path::$FILE->contents . 'global/' . $fileName . '.php';
			// else
			// 	include_once $langFilePath;
			
			// $class					= new $className();
			// self::$datas->{ $id }	= $class->getDatas();
			
			
			
			// $langFilePath = Path::$FILE->contents . Lang::$LANG . '/' . $contentsInfos->fileName . '.php';
			
			// if ( !file_exists( $langFilePath ) )
			// 	include_once Path::$FILE->contents . 'global/' . $contentsInfos->fileName . '.php';
			// else
			// 	include_once $langFilePath;
			
			// $className				= new $contentsInfos->className();
			// self::$datas->{ $id }	= $className->getDatas();
		}
		*/
		
		echo '<pre>';
		var_dump(self::$datas);
		echo '</pre>';
		// print_r(self::$datas);
	}
	
	
	private function getDatas( $fileName, $className, $id )
	{
		$langFilePath = Path::$FILE->contents . Lang::$LANG . '/' . $fileName . '.php';
		
		if ( !file_exists( $langFilePath ) )
			include_once Path::$FILE->contents . 'global/' . $fileName . '.php';
		else
			include_once $langFilePath;
		
		$class					= new $className();
		self::$datas->{ $id }	= $class->getDatas();
	}
	
}



?>