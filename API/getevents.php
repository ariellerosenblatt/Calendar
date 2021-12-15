<?php
//getting the events from the database
ini_set("session.cookie_httponly", 1);
session_start();
// print_r($_SESSION);
require 'database.php';
header("Content-Type: application/json"); 


$data = json_decode(file_get_contents("php://input"));

   $username = $_SESSION['username'];

$shareduser = $data->shareduser;

$token = $data->token;
if($token != $_SESSION['token']) //check for token
{
    $errormessage = "INVALID TOKEN";
    $safe = htmlentities($errormessage);
    echo json_encode($errormessage);
    exit;
}

$query = "SELECT * from events where username='" . $username . "' or shareduser='" . $username . "'";
// $query = "SELECT * from events where username='" . $username ."'";
if(!$query){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$safe = htmlentities($row["content"]);


$results = mysqli_query($mysqli, $query);
$completeevents = array();
while($row = mysqli_fetch_array($results))
{
    $eventarray = array();
    $eventarray['date'] = $row['date'];
    // echo($eventarray['date']);
    
    $eventarray['time'] = $row['time'];
    $eventarray['username'] = $row['username'];
    $eventarray['title'] = $row['title'];
    $eventarray['id'] = $row['id'];
    $eventarray['priority'] = $row['priority'];
    $eventarray['shareduser'] = $row['shareduser'];

    array_push($completeevents, $eventarray);
}
echo json_encode($completeevents);


// if(!hash_equals($_SESSION['token'], $json_obj['token'])){
//     die("Request forgery detected");
//   }

?>