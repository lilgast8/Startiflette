<?php

if(isset($_POST['ajax'])) {
	include_once('../../../../init.php');
	include_once(SITE_ROOT.'php/contents/'.LG.'/texts.php');
	include_once(SITE_ROOT.'php/functions/load-pages-infos.php');
}

?>

<!-- Projects -->
<section id="page-content" class="projects">
	
	<br><br><br>
	- Desktop page content / <?php echo $main->contents->global->menu->projects; ?> / <?php echo Config::$LANG; ?> -
	<br><br>
	
	<ul>
		<li><a href="<?php echo $main->path->url->base . Config::$LG_LINK; ?>projet/1/nom-projet-1" class="project-link">Project 1</a></li>
		<li><a href="<?php echo $main->path->url->base . Config::$LG_LINK; ?>projet/2/nom-projet-2" class="project-link">Project 2</a></li>
		<li><a href="<?php echo $main->path->url->base . Config::$LG_LINK; ?>projet/3/nom-projet-3" class="project-link">Project 3</a></li>
	</ul>
	<br><br><br>
	
</section>
