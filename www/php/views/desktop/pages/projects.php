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
	- Desktop page content / Projets -
	<br><br>
	
	<ul>
		<li><a href="<?php echo WEB_ROOT; ?>projet/1/nom-projet-1" class="project-link">Project 1</a></li>
		<li><a href="<?php echo WEB_ROOT; ?>projet/2/nom-projet-2" class="project-link">Project 2</a></li>
		<li><a href="<?php echo WEB_ROOT; ?>projet/3/nom-projet-3" class="project-link">Project 3</a></li>
	</ul>
	<br><br><br>
	
</section>
