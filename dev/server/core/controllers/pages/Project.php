<?php



class Project extends AbstractViewController
{
	
	protected function getPageViewDynamicInfos()
	{
		// echo '<br>🚀<br>';
		
		// call API
		// [ ... ]
		
		
		
		$this->response = new stdClass();
		
		
		// simulate a valid page
		$this->response->pageExist = true;
		$this->response->urls			= (object) [
			"fr" => 'projet/1/nom-1/filtre-1',
			"en" => 'project/1/name-1/filter-1',
			"ex" => 'project-ex/1/name-ex-1/filter-ex-1'
		];
		$this->response->datas		= (object) [
			'metas' => [
				'title'	=> 'Projet dynamique 1',
				'desc'	=> 'Description du projet dynamique 1'
			]
		];
		
		
		// simulate a nonvalid page
		$this->response->pageExist = false;
		
		
		// echo '<pre>';
		// print_r( $this->response );
		// echo '</pre>';
		// exit();
		
		
		
		/*if ( $response->pageExist ) {
			echo '🍰';
			
			$this->router = Router::getInstance();
			
			// $this->router->setAltLangUrl( $response->altUrls );
			// $this->router->forceDynamic( $response->altUrls );
		}
		else {
			echo '🐩';
		}*/
	}
	
}



?>