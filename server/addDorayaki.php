<?php
    if (isset($_POST['submit'])) {
        $dorayakiName = $_REQUEST['inputDorayakiName'];
        $dorayakiDescription = $_REQUEST['inputDorayakiDescription'];
        $dorayakiPrice = $_REQUEST['inputDorayakiPrice'];
        $dorayakiStock = 1;
        
        // header('Location: ../client/pages/history.html');
        
        // $serverIP = $_SERVER['HTTP_CLIENT_IP'];
        // $timestamp = CURRENT_TIMESTAMP;

        // $body = array('request_name' => 'a', 'nama_dorayaki' => $dorayakiName, 'jumlah' => $dorayakiStock, 'ip' => $serverIP, 'endpoint' => 'a', 'timestamp' => $timestamp);
        // $soapRes = $soapClient->addRequest($body);

        // if (extension_loaded('soap')) {
        //     header('Location: ../client/pages/dashboard.html');
        // } else {
        //     header('Location: ../client/pages/add.html');
        // }
        $db = new SQLite3('../db/doraemonangis.sq3');

        if(!$db) {
            echo $db->lastErrorMsg();
        } else {
            echo "Open database success...\n";
        }

        $res = $db->query("SELECT MAX(dorayaki_id) AS dorayaki_id_max FROM dorayakis");
        
        $row = $res->fetchArray();
        $dorayakiId = $row['dorayaki_id_max'] + 1;

        $filename = $_FILES['uploadfile']['name'];
        $tempname = $_FILES['uploadfile']['tmp_name'];
        $folder = "../db/images/".$filename;

        if (!empty($dorayakiName) and !empty($dorayakiDescription) and !empty($dorayakiPrice) and !empty($dorayakiStock) and !empty($filename)) {
            if (move_uploaded_file($tempname, $folder)) {
                $sql = "INSERT INTO dorayakis VALUES('" . $dorayakiId . "','" . $dorayakiName . "','" . $dorayakiDescription . "','" . $filename . "'," . $dorayakiPrice . "," . $dorayakiStock . ");";

                $ret = $db->exec($sql);

                echo $db->lastErrorMsg();

                header('Location: ../client/pages/dashboard.html');
            }
        } else {
            header('Location: ../client/pages/add.html');
        }
    }
?>