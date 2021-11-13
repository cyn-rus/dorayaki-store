<?php
    setcookie("username", null, -1, '/');
    setcookie("isadmin", null, -1, '/');
    setcookie("PHPSESSID", null, -1, '/');
    header("location:../client/pages/login.html");
?>