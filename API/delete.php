<?php
//Deleting event
ini_set("session.cookie_httponly", 1);
session_start();
require "database.php"; 


header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$token = $data->token;
if($token != $_SESSION['token']) //check for token
{
    $errormessage = "INVALID TOKEN";
    $safe = htmlentities($errormessage);
    echo json_encode($safe);
    exit;
}

$errormessage = "SUCCESS";

$arr = array('errormessage'=>$errormessage);
echo json_encode($arr);


$to_insert = $mysqli->prepare("DELETE FROM events WHERE id=?");
$to_insert->bind_param('i', $id);
// $safe = htmlentities($row["content"]);

$to_insert->execute();
$to_insert->close();

if(!$to_insert){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}



// if(!hash_equals($_SESSION['token'], $json_obj['token'])){
//     die("Request forgery detected");
//   }

exit;

?>