<?php 
//logging in the user
session_start();
$username = "";
require "database.php"; 
$errormessage = "";
$message = "";


$data = json_decode(file_get_contents("php://input"));

   $loginusername = $data->loginusername;
   $loginpassword = $data->loginpassword;

   $passwordfinal = password_hash($password,PASSWORD_DEFAULT);

   $stmt = $mysqli->prepare("Select * from users"); //looking in user table
    $username = mysqli_real_escape_string($mysqli, $loginusername);
    $stmt->execute();
    $stmt->bind_result($dbusername, $dbpassword);


    if (empty($loginusername) || empty($loginpassword)) //if username or password is empty
    {
        $errormessage = "Field empty! Try again!";
        $arr = array('errormessage'=>$errormessage,'message'=>$message);
        echo json_encode($arr);
    }
    while ($stmt->fetch()) { //iterate through all rows in users
        if ($username == $dbusername && password_verify($loginpassword, $dbpassword)) {
            // $errormessage = "SUCCESSFUL MATCHING";
            // $errormessage = $loginusername;
            $_SESSION['username'] = $username;
            $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
            // $arr = array('errormessage'=>$errormessage,'message'=>$message, 'token'=>$_SESSION['token']);
            // echo json_encode($arr);

            $safe = htmlentities($errormessage);
            $arr = array('errormessage'=>$safe, 'token'=>$_SESSION['token']);
            echo json_encode($arr);

            // echo json_encode(array(
            //     "success"=>true,
            //     "token"=>$_SESSION['token']
            // ));
            exit;
        } else {
       
        }
    }
    $errormessage = "LOGIN FAILED!";
    $arr = array('errormessage'=>$errormessage);
    // echo json_encode(array(
    //     "success"=>true,
    //     "token"=>$_SESSION['token']
    // ));
    $safe = htmlentities($arr);
    echo json_encode($arr);

    $stmt->close();



?>