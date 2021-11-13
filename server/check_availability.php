<?php
    $username = $_REQUEST['q'];
    
    if ($username !== '') {
        $db = new SQLite3('../db/doraemonangis.sq3');
        $sql = "SELECT * FROM users WHERE username='" . $username . "'";
        $result = $db->query($sql);

        $found = 0;
        while ($row = $result->fetchArray()) {
            $found = 1;
        }

        if ($found == 1) {
            echo json_encode(['found' => 1]);
        } else {
            echo json_encode(['found' => 0]);
        }   
    }
?>