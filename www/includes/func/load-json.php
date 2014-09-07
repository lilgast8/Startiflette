<?php

$jsonInfosPages = file_get_contents(SITE_ROOT.ASSETS.'json/infos-pages-'.LG.'.json');
$infosPages = json_decode($jsonInfosPages, true);

$jsonProjects = file_get_contents(SITE_ROOT.ASSETS.'json/projects-'.LG.'.json');
$projects = json_decode($jsonProjects, true);

?>