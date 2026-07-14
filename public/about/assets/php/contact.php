<?php
require __DIR__ . '/../../../../config/config.php';

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';


$nameSanitized = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$emailSanitized = filter_var($email, FILTER_SANITIZE_EMAIL);
$subjectSanitized = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$messageSanitized = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$emailValidated = filter_var($email, FILTER_VALIDATE_EMAIL);

$body = "Name: $nameSanitized\r\n\r\n$messageSanitized";

if (!$emailValidated) 
{
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
    exit;
}
elseif (empty($nameSanitized) || empty($subjectSanitized) || empty($messageSanitized)) 
{
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}   

$headers = "From: portfolio@yourdomain.com\r\n" . "Reply-To: $emailSanitized\r\n" . "Content-Type: text/plain; charset=UTF-8\r\n";
//$sent = mail(CONTACT_EMAIL, $subjectSanitized, $body, $headers);
$sent = true; // Simulating email sending for testing purposes


if($sent)
{
    echo json_encode(['status' => 'success', 'message' => 'Message submitted successfully.']);
}
else
{
    echo json_encode(['status' => 'error', 'message' => 'Failed to send email. Please try again later.']);
}

?>