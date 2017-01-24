<?php

// Define some constants
define( "RECIPIENT_NAME", "John Doe" );
define( "RECIPIENT_EMAIL", "mail@mail.com" );

// Read the form values
$success = false;
$senderName = isset( $_POST['name'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['name'] ) : "";
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$phone = isset( $_POST['phone'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['phone'] ) : "";
$subject ="A contact request send by ". $senderName;
$discuss = isset( $_POST['discuss'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['discuss'] ) : "";
$message = "Sender Name: ". $senderName . " Sender Emai: ".$senderEmail. " Sender Phone: ". $phone. ' Sender Want to: '. $discuss;

// If all values exist, send the email
if ( $senderName && $senderEmail && $message ) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: " . $senderName . " <" . $senderEmail . ">";
  $success = mail( $recipient, $subject, $message, $headers );
  echo "<p class='success'>Thank you <b>" . $senderName ."</b> for contacting us. We will contact you ASAP!</p>";
}

?>