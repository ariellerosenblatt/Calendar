<?php
//add user file
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';
header("Content-Type: application/json");



$data = json_decode(file_get_contents("php://input"));

   $event_title = $data->event_title;
   $event_date = $data->event_date;
   $username = $data->username;
   $event_time = $data->event_time;
   $event_priority = $data->event_priority;
   $shareduser = $data->shareduser;
   

$token = $data->token;
if($token != $_SESSION['token']) //check for token
{
    $errormessage = "INVALID TOKEN";
    $safe = htmlentities($errormessage);
    echo json_encode($safe);
    exit;
}
// echo(isset($shareduser));
if ($shareduser == "")
{
    $shareduser = "-1";
    // echo("HI");
}

// echo($shareduser);
$arr = array('event_title'=>$event_title,'event_date'=>$event_date, 'username'=>$username, 'event_time'=>$event_time, 'event_prority'=>$event_priority, 'shareduser'=>$shareduser);
$safe = htmlentities($arr);
echo json_encode($arr);

$test = "hiii";

$to_insert = $mysqli->prepare("INSERT into events (username, title, date, time, priority, shareduser) values (?, ?, ?, ?, ?, ?)");

$to_insert->bind_param('ssssis', $username, $event_title, $event_date, $event_time, $event_priority, $shareduser);

$to_insert->execute();

$to_insert->close();

// if(!hash_equals($_SESSION['token'], $json_obj['token'])){
//     die("Request forgery detected");
//   }


exit;


?>