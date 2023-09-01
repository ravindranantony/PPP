<?php

// Retrieve form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// Email setup
$to = "connect@saravanan.com"; // Replace with your email address
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8" . "\r\n";

// Send email
if (mail($to, $subject, $message, $headers)) {
    header("Location: index.html?message=success");
} else {
    header("Location: index.html?message=error");
}

?>
