<?php

$fname = $_POST["Fname"];
$lname = $_POST["Lname"];
$email = $_POST["email"];
$sub = $_POST["sub"];
$msg = $_POST["message"];

$body = "New message from $fname $lname ($email):\n\n$msg\n";

$from = 'ar899@cam.ac.uk';

$to = 'ar899@cam.ac.uk';

$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $email \r\n";

mail($from, $sub, $body, $headers)

?>