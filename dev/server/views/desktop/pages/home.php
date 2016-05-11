
<?php

// $loader = new Twig_Loader_Array(array(
//     'index' => 'Hello {{ name }}!',
// ));
// $twig = new Twig_Environment($loader);

// echo $twig->render('index', array('name' => 'Fabien'));

?>

<!-- Home -->
<section id="page" class="home">
	
	<br><br><br>
	<?php echo Contents::$datas->home->title; ?><br>
	desktop page content / <?php echo Lang::$LANG; ?>
	<br><br>
	<img src="<?php echo Path::$URL->img; ?>temp/home.jpg" alt="Home">
	<br><br><br><br>
	
</section>
