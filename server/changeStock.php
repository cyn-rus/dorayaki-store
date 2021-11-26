<?php
    $found = 0;
    $dorayaki = $_REQUEST['name'];
    $changed_stock = $_REQUEST['stock'];
    $type = $_REQUEST['type'];
    $isAdmin = $_COOKIE['isadmin'];

    $db = new SQLite3('../db/doraemonangis.sq3');

    if ($isAdmin == '1' and $type == 'add') {
        $soapClient = new SoapClient('http://localhost:9999/dorayaki_supplier/dorayakiAddStock?wsdl');

        $serverIP = $_SERVER['REMOTE_ADDR'];
        $timestamp = date("F j, Y, g:i a");

        $body = array('request_name' => 'b', 'nama_dorayaki' => $dorayaki, 'jumlah' => $changed_stock, 'ip' => $serverIP, 'endpoint' => 'a', 'timestamp' => $timestamp);
        $soapRes = $soapClient->addRequest($body);

        $sqlModify = "INSERT INTO modifies VALUES(CURRENT_TIMESTAMP, '" . $_COOKIE['username'] . "', '" . $dorayaki . "', '" . $changed_stock . "', '" . $type . "')";
        $ret2 = $db->exec($sqlModify);

        if ($ret2) {
            echo json_encode(['changed' => 1]);
        } else {
            echo json_encode(['changed' => 2]);
        }
    } else {
        if ($type == 'add') {
            $set_stock = "SET stock = stock + " . $changed_stock . " ";
        } else {
            $set_stock = "SET stock = stock - " . $changed_stock . " ";
        }
    
        $sqlUpdate = "UPDATE dorayakis "
            . $set_stock
            . "WHERE dorayaki_name = '" . $dorayaki . "' ";
    
        $ret = $db->exec($sqlUpdate);
    
        
        if ($isAdmin == '1') {
            $sqlModify = "INSERT INTO modifies VALUES(CURRENT_TIMESTAMP, '" . $_COOKIE['username'] . "', '" . $dorayaki . "', '" . $changed_stock . "', '" . $type . "')";
            $ret2 = $db->exec($sqlModify);
            
            $sqlRequest = "INSERT INTO requests VALUES(".$body['request_name'].", 420)";
            $ret3 = $db->exec($sqlRequest);
        } else {
            $ret2 = true;
            $ret3 = true;
        }

        if ($ret and $ret2 and $ret3) {
            echo json_encode(['changed' => 1]);
        } else {
            echo json_encode(['changed' => 2]);
        }
    } 
?>