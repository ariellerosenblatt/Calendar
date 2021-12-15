<?php 
//registration backend
session_start();
ini_set("session.cookie_httponly", 1);
$username = "";
require "database.php"; 
$errormessage = "";
$message = $_POST['username'];


$data = json_decode(file_get_contents("php://input"));

   $username = $data->username;
   $password = $data->password;
   $password2 = $data->password2;



if ($username != "")
{
    $errormessage = "SUCCESS! Login with your new username!";
    
    if (empty($username)) //checking if places are empty 
    {
        array_push($errors, "username REQUIRED!");
        $errormessage = "username REQUIRED"; 
        $safe = htmlentities($errormessage);
        $arr = array('errormessage'=>$safe,'message'=>$message);
        echo json_encode($arr);
        die();
    }
    if (empty($password))
    {
        array_push($errors, "PASSWORD REQUIRED!");
        $errormessage = "PASSWORD REQUIRED"; 
        $safe = htmlentities($errormessage);
        $arr = array('errormessage'=>$safe,'message'=>$message);
        echo json_encode($arr);
        die();
    }
    if (empty($password2))
    {
        array_push($errors, "CONFIRM PASSWORD REQUIRED!");
        $errormessage = "CONFIRM PASSWORD REQUIRED" ; 
        $safe = htmlentities($errormessage);
        $arr = array('errormessage'=>$safe,'message'=>$message);
        echo json_encode($arr);

        die();
    }
    if ($password != $password2)
    {
        array_push($errors, "PASSWORDS DON'T MATCH!");
        $errormessage = "PASSWORDS DON'T MATCH" ; 
        $safe = htmlentities($errormessage);
        $arr = array('errormessage'=>$safe,'message'=>$message);
        echo json_encode($arr);
        die(); 
    }


    $query = "Select * from users WHERE `username` = '" . $username . "';"; //looking to see if there is user
   
    $username = mysqli_real_escape_string($mysqli, $username);
    $results = mysqli_query($mysqli, $query);
    // while($row=$stmt->fetch_assoc()){
    //     echo "<p>".$row["content"]."</p>\n";
    // }
    

    if(mysqli_num_rows($results) > 0)
    {
        $errormessage = "Username taken!";
        $safe = htmlentities($errormessage);
        $arr = array('errormessage'=>$safe,'message'=>$message);
        echo json_encode($arr);
        // die();
    }
    else //object doesnt exist (no rows)
    {
        $passwordfinal = password_hash($password,PASSWORD_DEFAULT);  //hashing password
        $query = "INSERT INTO users(username, password) VALUES('$username', '$passwordfinal')"; //inserting user info into database
        $results = mysqli_query($mysqli, $query);
        $resultssss = mysqli_query($mysqli, $to_insert);
    
        // $_SESSION['regusername'] = $username;
        $_SESSION['username'] = $username; 
        $errormessage = "Success!! Login with your new username!! ";
    
        $message = "USER LOGGED IN";
        $safe = htmlentities($errormessage);
        $arr = array('errormessage'=>$safe);
        echo json_encode($arr);
    }

   
}

?>