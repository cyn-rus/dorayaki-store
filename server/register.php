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
        $email = $_REQUEST['inputEmail'];

        $db = new SQLite3('../db/doraemonangis.sq3');

        if(!$db) {
            echo $db->lastErrorMsg();
        } else {
            echo "Open database success...\n";
        }

        if(!empty($username) and !empty($password) and !empty($email)) {
            $sql = "INSERT INTO users VALUES('" . $username . "','" . Encipher($password,5) . "','" . $email . "'," . 0 . ')';
                    
            $ret = $db->exec($sql);

            if(!$ret){
                echo $db->lastErrorMsg();
                header('Location: ../client/pages/register.html');
            } else {
                echo "Insert data success...\n";
                $cookie_name = "username";
                $cookie_value = $_REQUEST['inputUsername'];
                setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
                setcookie("isadmin", 0, time() + (86400 * 30), "/");
                header('Location: ../client/pages/dashboard.html');
            }
        } else {
            header('Location: ../client/pages/register.html'); 
        }
    }
?>