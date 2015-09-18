<?php



class Contents
{
	
	protected static $instance;
	
	// static $global		= null;
	// static $alt			= null;
	
	// static $error404	= null;
	// static $home		= null;
	// static $about		= null;
	// static $projects	= null;
	// static $project		= null;
	
	// public $files		= null;
	
	static $datas = null;
	
	
	protected function __construct()
	{
		// $this->config = Config::getInstance();
		
		// $this->setDeviceDir();
		// $this->setPaths();
		
		$this->setContentsConfig();
		
		// $this->setFilesList();
		// $this->setInclude();
		// $this->setContents();
		
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
		$this->contentsInfos = new stdClass();
		
		if ( !file_exists( Path::$FILE->contentsFile ) )
			throw new ErrorException( 'Content infos file is missing!' );
		
		$this->contentsInfos	= file_get_contents( Path::$FILE->contentsFile );
		$this->contentsInfos	= json_decode( $this->contentsInfos );
	}
	
	
	/*private function setFilesList()
	{
		$this->files = new stdClass();
		
		// $this->files->global	= 'global';
		$this->files->alt		= 'alt';
		
		$this->files->error404	= 'error-404';
		// $this->files->home		= 'home';
		// $this->files->about		= 'about';
		// $this->files->projects	= 'projects';
		// $this->files->project	= 'project';
	}*/
	
	
	private function setDatas()
	{
		/*foreach ( $this->files as $file => $fileName ) {
			
			$globalFilePath = Path::$FILE->contents . 'global/' . $fileName . '.php';
			
			if ( file_exists( $globalFilePath ) )
				include_once $globalFilePath;
			else
				include_once Path::$FILE->contents . Lang::$LANG . '/' . $fileName . '.php';
			
			
			
			// $this->${ $file } = Contents::getInstance();
			// self::${ $varName } = $value;
		}*/
		
		
		
		self::$datas = new stdClass();
		
		
		foreach ( $this->contentsInfos as $id => $contentsInfos ) {
			
			/*$globalFilePath = Path::$FILE->contents . 'global/' . $contentsInfos->fileName . '.php';
			
			if ( file_exists( $globalFilePath ) )
				include_once $globalFilePath;
			else
				include_once Path::$FILE->contents . Lang::$LANG . '/' . $contentsInfos->fileName . '.php';*/
			
			
			$langFilePath = Path::$FILE->contents . Lang::$LANG . '/' . $contentsInfos->fileName . '.php';
			
			if ( !file_exists( $langFilePath ) )
				include_once Path::$FILE->contents . 'global/' . $contentsInfos->fileName . '.php';
			else
				include_once $langFilePath;
			
			
			
			
			// echo $id. ' - '. $contentsInfos->className . '<br>';
			// $this->${ $id } = $contentsInfos->className::getInstance();
			// self::${ $id } = $contentsInfos->className::getInstance();
			$className = new $contentsInfos->className();
			// $this->${ $id } = $className->getContent();
			// self::${ $id } = $className->getContent();
			// self::${ $id } = $className::getContent();
			
			// self::$datas->{ $id } = new stdClass();
			self::$datas->{ $id } = $className->getDatas();
			
			// echo $this->${ $id };
			// echo self::${ $id }.'<br>';
			// echo '<pre>';
			// var_dump(self::$datas->{ $id });
			// echo '</pre>';
			
			// $this->${ $file } = Contents::getInstance();
			// self::${ $varName } = $value;
		}
		
		// print_r(self::$datas);
	}
	
	
	private function setContents()
	{
		// self::$alt = getError404();
		
		// $funcName = 'getError404';
		
		// self::$alt = $funcName();
		
		
		// print_r( self::$alt );
	}
	
}



?>




<?php



/*function getContents() {
	
	include_once Lang::$LANG . '/global.php';
	include_once Lang::$LANG . '/alt.php';
	
	include_once Lang::$LANG . '/error404.php';
	include_once Lang::$LANG . '/home.php';
	include_once Lang::$LANG . '/about.php';
	include_once Lang::$LANG . '/projects.php';
	include_once Lang::$LANG . '/project.php';
	
	
	$contents = new stdClass();
	
	$contents->global	= getGlobal();
	$contents->alt		= getAlt();
	
	$contents->error404	= getError404();
	$contents->home		= getHome();
	$contents->about	= getAbout();
	$contents->projects	= getProjects();
	$contents->project	= getProject();
	
	
	
	return $contents;
	
}*/



?>