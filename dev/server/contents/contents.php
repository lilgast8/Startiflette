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
		
		foreach ( $this->contentsConfig as $id => $contentsInfos ) {
			$langFilePath = Path::$FILE->contents . Lang::$LANG . '/' . $contentsInfos->fileName . '.php';
			
			if ( !file_exists( $langFilePath ) )
				include_once Path::$FILE->contents . 'global/' . $contentsInfos->fileName . '.php';
			else
				include_once $langFilePath;
			
			$className				= new $contentsInfos->className();
			self::$datas->{ $id }	= $className->getDatas();
		}
	}
	
}



?>