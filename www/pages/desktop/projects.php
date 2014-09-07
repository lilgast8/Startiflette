<?php

if(isset($_POST['Page'])) {
	include_once('../../init.php');
	include_once(SITE_ROOT.'includes/contents/texts-'.LG.'.php');
	include_once(SITE_ROOT.'includes/func/load-json.php');
}

?>

<!-- Projects -->
<section id="page-content" class="projects">
	
	- Page content / Projets -
	
	<ul>
		<li>
			<a href="<?php echo WEB_ROOT; ?>projet/1/nom-projet-1" class="project-link">Project 1</a>
			<a href="<?php echo WEB_ROOT; ?>projet/2/nom-projet-2" class="project-link">Project 2</a>
			<a href="<?php echo WEB_ROOT; ?>projet/3/nom-projet-3" class="project-link">Project 3</a>
		</li>
	</ul>
	
</section>
