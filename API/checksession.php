<?php
require 'database.php';
session_start();
//checking if session is already there

if (isset($_SESSION['username']))
{
    $arr = array('session'=>$_SESSION['username'], 'token'=>$_SESSION['token']);
    // $safe = htmlentities($arr);
    echo json_encode($arr);
}
else{

}





?>