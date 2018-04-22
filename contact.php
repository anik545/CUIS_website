<?php
    include("Includes/header.php");
    include ("Includes/sponsorsidebar.php");
    ?>
<link href="Styles/Metro.css" rel="stylesheet" type="text/css" />
<link href="Styles/FrontPage.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="Includes/windowfiles/dhtmlwindow.css" type="text/css" />

<div id="fb-root"></div> 
<script>(function(d, s, id) { 
  var js, fjs = d.getElementsByTagName(s)[0]; 
  if (d.getElementById(id)) return; 
  js = d.createElement(s); js.id = id; 
  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=266095990089361";
  fjs.parentNode.insertBefore(js, fjs); 
}(document, 'script', 'facebook-jssdk'));</script>
      
            
    
<div class="tile2">
 <h1 class="accent"><span><div style="text-align: center">Contact</div></span></h1>
<p>If you have any questions, please fill out the form below and click submit. You can also email a specific <a href="/committee.php">committee</a> member.
<p>Alternatively join our <a href="/join.php#Join">mailing list</a> to be kept up to date with all our info.</p>
<form name="contactform" method="post" action="send_form_email.php">
<table width="450px">
<tr>
 <td valign="top">
  <label for="first_name">First Name *</label>
 </td>
 <td valign="top">
  <input  type="text" name="first_name" maxlength="50" size="30">
 </td>
</tr>
<tr>
 <td valign="top"">
  <label for="last_name">Last Name *</label>
 </td>
 <td valign="top">
  <input  type="text" name="last_name" maxlength="50" size="30">
 </td>
</tr>
<tr>
 <td valign="top">
  <label for="email">Email Address *</label>
 </td>
 <td valign="top">
  <input  type="text" name="email" maxlength="80" size="30">
 </td>
</tr>
<tr>
 <td valign="top">
  <label for="telephone">Telephone Number</label>
 </td>
 <td valign="top">
  <input  type="text" name="telephone" maxlength="30" size="30">
 </td>
</tr>
<tr>
 <td valign="top">
  <label for="comments">Comments *</label>
 </td>
 <td valign="top">
  <textarea  name="comments" maxlength="1000" cols="26" rows="6"></textarea>
 </td>
</tr>
<tr>
 <td colspan="2" style="text-align:center">
  <input type="submit" value="Submit"></td>
</tr>
</table>
</form>
<p>&nbsp;</p>
</div></body>
<?php
 	include ("Includes/followsidebar.php");  
   include ("Includes/footer.php");
   ?>