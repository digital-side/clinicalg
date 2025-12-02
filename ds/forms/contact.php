<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  // loaded from variables.php
  // $to_email_address = '';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }
  if( file_exists($php_variables = '../variables.php' )) {
      include( $php_variables);
  } else {
      die( 'Unable to load the configuration');
  }


  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  $contact->to = $to_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
  $contact->smtp = array(
      'host' => $smtp_host,
      'username' => $smtp_username,
      'password' => $smtp_password,
      'port' => $smtp_port
    );
*/
  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);
  // to avoid bots spam, from person this field will always come empty
  $contact->honeypot = $_POST['first_name'];


  echo $contact->send();
?>
