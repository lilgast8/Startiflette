
<!-- Projects -->
<section id="page-content" class="projects">
	
	<br><br><br>
	- Desktop page content / <?php echo $main->contents->global->menu->projects; ?> / <?php echo Config::$LANG; ?> -
	<br><br>
	
	<ul>
		<?php
		foreach($main->config->projects->{ Config::$LANG } as $url => $project)
			echo '<li><a href="'. $main->path->url->base . Config::$LG_LINK . $url .'" class="project-link">'. $project->title .'</a></li>';
		?>
	</ul>
	<br><br><br>
	
</section>
