<?php
    function Cipher($ch, $key)
    {
        if (!ctype_alpha($ch))
            return $ch;

        $offset = ord(ctype_upper($ch) ? 'A' : 'a');
        return chr(fmod(((ord($ch) + $key) - $offset), 26) + $offset);
    }

    function Encipher($input, $key)
    {
        $output = "";

        $inputArr = str_split($input);
        foreach ($inputArr as $ch)
            $output .= Cipher($ch, $key);

        return $output;
    }

    if (isset($_POST['submit'])) {
        $username = $_REQUEST['inputUsername'];
        $password = $_REQUEST['inputPassword'];
    }

    $found = 0;

    $db = new SQLite3('../db/doraemonangis.sq3');
    $sql = "SELECT * FROM users WHERE username='" . $username . "' AND password='" . Encipher($password,5) . "'";
    $result = $db->query($sql);

    while ($row = $result->fetchArray()) {
        $found = 1;
    }

    if ($found == 1) {
        echo "login success";
        $cookie_name = "username";
        $cookie_value = $_REQUEST['inputUsername'];
        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
        
        $sql2 = "SELECT * FROM users WHERE username='" . $username . "' AND isadmin=1";
        $result2 = $db->query($sql2);

        $found2 = 0;

        while ($row = $result2->fetchArray()) {
            $found2 = 1;
        }
        
        if ($found2 === 1) {
            setcookie("isadmin", 1, time() + (86400 * 30), "/");
        } else {
            setcookie("isadmin", 0, time() + (86400 * 30), "/");
        }

        header("location:../client/pages/dashboard.html");
    } else {
        header("location:../client/pages/login.html");
    }

    unset($db);
?>