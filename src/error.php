<?php
$status = $_SERVER['REDIRECT_STATUS'];
$codes = array(
       403 => array('403 Forbidden', 'The server has refused to fulfill your request.'),
       404 => array('404 Not Found', 'The document/file requested was not found on this server.'),
       405 => array('405 Method Not Allowed', 'The method specified in the Request-Line is not allowed for the specified resource.'),
       408 => array('408 Request Timeout', 'Your browser failed to send a request in the time allowed by the server.'),
       500 => array('500 Internal Server Error', 'The request was unsuccessful due to an unexpected condition encountered by the server.'),
       502 => array('502 Bad Gateway', 'The server received an invalid response from the upstream server while trying to fulfill the request.'),
       504 => array('504 Gateway Timeout', 'The upstream server failed to send a request in the time allowed by the server.'),
);
$status=403;
$title = $codes[$status][0];
$message = $codes[$status][1];
if ($title == false || strlen($status) != 3) {
       $message = 'Please supply a valid status code.';
}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<!-- For IE -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<!-- For Resposive Device -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title>Error!</title>

		<!-- Favicon -->
		<link rel="icon"  sizes="56x56" href="img/favicon.png">


		<!-- Main style sheet -->
		<link rel="stylesheet" type="text/css" href="/css/style.css">
		<!-- responsive style sheet -->
		<link rel="stylesheet" type="text/css" href="/css/responsive.css">


		<!-- Fix Internet Explorer ______________________________________-->

		<!--[if lt IE 9]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
			<script src="vendor/html5shiv.js"></script>
			<script src="vendor/respond.js"></script>
		<![endif]-->
			<style>
				.sponsorimg{
					position: relative;
					top: 50%;
					transform: translateY(-50%);
					display: block;
    margin-left: auto;
    margin-right: auto;

				}

				.sponsorbox{
					border-width: 1px;
					border-color: gray;
					height: 300px;
					border-style: solid;
					
					

				}
				p{
					font-size: 130%
				}

                * {
    margin: 0;
}
html,
body {
  margin: 0;
  height: 100%;
}

.main-page-wrapper {
  box-sizing: border-box;
  position: relative;
  padding-bottom: 1em; /* Height of footer */
  min-height: 100%;
}


footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}			</style>
	</head>

	<body>
		<div class="main-page-wrapper">



			<!-- 
			=============================================
				Theme Header
			============================================== 
			-->
			<header class="theme-main-header">
					<div class="container">
						<a href="index.html" class="logo float-left tran4s"><img style="height:50px" src="img/logowhite.png" alt="Logo"></a>
						
						<!-- ========================= Theme Feature Page Menu ======================= -->
						<nav class="navbar float-right theme-main-menu one-page-menu">
						   <!-- Brand and toggle get grouped for better mobile display -->
						   <div class="navbar-header">
							 <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
							   <span class="sr-only">Toggle navigation</span>
							   Menu
							   <i class="fa fa-bars" aria-hidden="true"></i>
							 </button>
						   </div>
						   <!-- Collect the nav links, forms, and other content for toggling -->
						   <div class="collapse navbar-collapse" id="navbar-collapse-1">
							 <ul class="nav navbar-nav">
								<li class="active"><a href="index.html">HOME</a></li>
								<li><a href="index.html#about-us">ABOUT</a></li>
								<li><a href="index.html#join">JOIN</a></li>
								<li><a href="index.html#events">EVENTS</a></li>
								<li><a href="committee.html">COMMITTEE</a></li>
								<li><a href="sponsors.html">SPONSORS</a></li>
								<li><a href="charities.html">CHARITIES</a></li>
								<li><a href="index.html#contact-section">CONTACT</a></li>
								 </ul>
						   </div><!-- /.navbar-collapse -->
						</nav> <!-- /.theme-feature-menu -->
					</div>
				</header> <!-- /.theme-main-header -->
	

			<!--
			=====================================================
				Theme Inner page Banner
			=====================================================
			-->
			<section class="inner-page-banner">
				<div class="opacity">
					<div class="container">
					</div> <!-- /.container -->
				</div> <!-- /.opacity -->
			</section> <!-- /.inner-page-banner -->
			

			
			<!--
			=====================================================
				Blog Page Details
			=====================================================
			-->
			<article class="blog-details-page">
				<div class="container">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-fix">
							<div class="blog-details-post-wrapper">
									<!-- <img src="images/blog/8.jpg" alt="Image"> -->
									<div class="post-heading">
										<h4 style="margin-top: 0px"><?php echo $title ?></h4>
									</div> <!-- /.post-heading -->
									
                                    <p style="margin-bottom: 15px"><?php echo $message ?></p>
                                    <br>

				</div> <!-- /.container -->
			</article>	        



			<!--
			=====================================================
				Footer
			=====================================================
			-->
			<footer>
					<div class="container">
						<ul>
							<li>
								<a href="https://www.facebook.com/indiasoc/" class="tran3s round-border">
									<i class="fa fa-facebook" aria-hidden="true"></i>
								</a>
							</li>
							<li>
								<a href="#" class="tran3s round-border">
									<i class="fa fa-snapchat" aria-hidden="true"></i>
								</a>
							</li>
							<li>
								<a href="https://www.instagram.com/cuindiasoc/?hl=en" class="tran3s round-border">
									<i class="fa fa-instagram" aria-hidden="true"></i>
								</a>
							</li>
							<li>
								<a href="mailto:india@cusu.cam.ac.uk" class="tran3s round-border">
									<i class="fa fa-envelope" aria-hidden="true"></i>
								</a>
							</li>
			
						</ul>
						<p>
							<script>
								document.write(Date().split ` ` [3])
							</script> Cambridge University India Society</p>
					</div>
				</footer>
				



			<!-- =============================================
				Loading Transition
			============================================== -->
			<div id="loader-wrapper">
				<div id="preloader_1">
	                <span></span>
	                <span></span>
	                <span></span>
	                <span></span>
	                <span></span>
	            </div>
			</div>

			

	        <!-- Scroll Top Button -->
			<button class="scroll-top tran3s p-color-bg">
				<i class="fa fa-long-arrow-up" aria-hidden="true"></i>
			</button>




			<script type="text/javascript" src="/js/jquery.2.2.3.min.js"></script>

			<script type="text/javascript" src="/js/bootstrap.min.js"></script>
		
			<script type="text/javascript" src="/js/validate.js"></script>
		
			<script type="text/javascript" src="/js/theme.js"></script>

		</div> <!-- /.main-page-wrapper -->
	</body>
</html>