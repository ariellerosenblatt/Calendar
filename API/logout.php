<?php
//logout backend
ini_set("session.cookie_httponly", 1);
session_start();
session_destroy(); //destroying session
unset($_SESSION['username']);
?>