
<!-- Projects -->
<section id="page-content" class="projects">
	
	<br><br><br>
	<?php echo $this->contents->projects->title; ?><br>
	desktop page content / <?php echo Lang::$LANG; ?>
	<br><br>
	<img src="<?php echo Path::$URL->img ?>temp/projects.jpg" alt="Projects">
	<br><br>
	
	<ul>
		<?php
		/*foreach($main->config->projects->{ Config::$LANG } as $url => $project)
			echo '<li><a href="'. $main->path->url->base . Config::$LG_LINK . $url .'" class="project-link">'. $project->title .'</a></li>';*/
		?>
	</ul>
	<br><br><br>
	
</section>
