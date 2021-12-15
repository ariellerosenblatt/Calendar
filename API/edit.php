<?php
//editing event
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';
header("Content-Type: application/json"); 

$data = json_decode(file_get_contents("php://input"));
   $username = $data->username;
   $id = $data->id;
   $event_title = $data->event_title;
   $event_date = $data->event_date;
   $event_time = $data->event_time;
   $event_priority = $data->event_priority;
   $shareduser = $data->shareduser;

   
   $token = $data->token;
   if($token != $_SESSION['token']) //check for token
   {
       $errormessage = "INVALID TOKEN";
       $safe = htmlentities($errormessage);
       echo json_encode($errormessage);
       exit;
   }
   $arr = array('event_title'=>$event_title,'event_date'=>$event_date, 'username'=>$username, 'event_time'=>$event_time, 'id'=>$id, 'event_priority'=>$event_priority, 'shareduser'=>$shareduser);
   $safe = htmlentities($arr);
   echo json_encode($safe);


    $to_insert = $mysqli->prepare("UPDATE events SET title = ?, date = ?, time = ?, priority = ?, shareduser = ? WHERE id = ?");
    $to_insert->bind_param('sssisi', $event_title, $event_date, $event_time, $event_priority, $shareduser, $id);
    $to_insert->execute();
    $to_insert->close();


    if(!$to_insert){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

  
?>