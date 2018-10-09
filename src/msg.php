<?php

$fname = $_POST["Fname"];
$lname = $_POST["Lname"];
$email = $_POST["email"];
$sub = $_POST["sub"];
$msg = $_POST["message"];

$body = "New message from $fname $lname ($email):\n\n$msg\n";

$from = 'indiasoc@srcf.net';

$to = 'sa868@cam.ac.uk';

$headers = "From: $from \r\n";
$headers .= "Reply-To: $email \r\n";
$headers .= "Bcc: ar899@cam.ac.uk\r\n";

mail($to, $sub, $body, $headers);

?>