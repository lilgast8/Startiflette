<?php



class Config
{
	
	protected static $instance;
	
	const CONFIG_FILE_PATH		= 'configs/config.json';
	
	static $ENV					= null;
	static $ENVS				= null;
	static $ALL_LANG			= null;
	static $GENERATE_JS_VIEW_ID	= null;
	static $HAS_MOBILE_VERSION	= null;
	static $TABLET_VERSION		= null;
	static $FORCE_DEVICE		= null;
	static $GA_ID				= null;
	static $CREDITS				= null;
	
	static $IS_DEV				= null;
	static $IS_PREPROD_LOCAL	= null;
	static $IS_PREPROD			= null;
	static $IS_PROD				= null;
	static $NEED_PAGE_ID		= null;
	
	private $jsFiles			= null;
	
	private $params				= null;
	
	
	protected function __construct()
	{
		$this->setConfig();
		$this->setEnvInfos();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setConfig()
	{
		$config = $this->getConfigFile();
		
		foreach ( $config as $varName => $value )
			self::${ $varName } = $value;
	}
	
	
	private function setEnvInfos()
	{
		self::$IS_DEV			= false;
		self::$IS_PREPROD_LOCAL	= false;
		self::$IS_PREPROD		= false;
		self::$IS_PROD			= false;
		
		
		if ( self::$ENV == 'dev' || strpos( self::$ENV, 'dev-' ) !== false )
			self::$IS_DEV = true;
		else if ( self::$ENV == 'preprod-local' || strpos( self::$ENV, 'preprod-local-' ) !== false )
			self::$IS_PREPROD_LOCAL = true;
		else if ( self::$ENV == 'preprod' || strpos( self::$ENV, 'preprod-' ) !== false )
			self::$IS_PREPROD = true;
		else if ( self::$ENV == 'prod' || strpos( self::$ENV, 'prod-' ) !== false )
			self::$IS_PROD = true;
	}
	
	
	private function getConfigFile()
	{
		if ( !file_exists( self::CONFIG_FILE_PATH ) )
			throw new ErrorException( 'Config file is missing!' );
		
		$config = file_get_contents( self::CONFIG_FILE_PATH );
		$config = json_decode( $config );
		
		
		return $config;
	}
	
	
	public function init()
	{
		$this->setComplexTransition();
		$this->setParams();
	}
	
	
	private function setComplexTransition()
	{
		if ( in_array( Device::$DEVICE, self::$GENERATE_JS_VIEW_ID ) )
			self::$NEED_PAGE_ID = true;
		else
			self::$NEED_PAGE_ID = false;
	}
	
	
	public function getJsFilesFile()
	{
		if ( !$this->jsFiles ) { // load file if it wasn't already done
			
			if ( !file_exists( Path::$FILE->jsFilesFile ) )
				throw new ErrorException( 'JsFilesFile is missing!' );
			
			$this->jsFiles	= file_get_contents( Path::$FILE->jsFilesFile );
			$this->jsFiles	= json_decode( $this->jsFiles );
		}
		
		
		return $this->jsFiles;
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->ENV				= self::$ENV;
		$this->params->ENVS				= self::$ENVS->{ $this->params->ENV };
		$this->params->ALL_LANG			= self::$ALL_LANG;
		$this->params->FORCE_DEVICE		= self::$FORCE_DEVICE;
		$this->params->GA_ID			= self::$GA_ID;
		$this->params->CREDITS			= self::$CREDITS;
		$this->params->IS_DEV			= self::$IS_DEV;
		$this->params->IS_PREPROD_LOCAL	= self::$IS_PREPROD_LOCAL;
		$this->params->IS_PREPROD		= self::$IS_PREPROD;
		$this->params->IS_PROD			= self::$IS_PROD;
		$this->params->NEED_PAGE_ID		= self::$NEED_PAGE_ID;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>