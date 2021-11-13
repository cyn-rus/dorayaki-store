<?php
    $found = 0;
    $dorayaki = $_REQUEST['name'];
    $changed_stock = $_REQUEST['stock'];
    $type = $_REQUEST['type'];

    $db = new SQLite3('../db/doraemonangis.sq3');

    if ($type == 'add') {
        $set_stock = "SET stock = stock + " . $changed_stock . " ";        
    } else {
        $set_stock = "SET stock = stock - " . $changed_stock . " ";
    }

    $sqlUpdate = "UPDATE dorayakis "
        . $set_stock
        . "WHERE dorayaki_name = '" . $dorayaki . "' ";

    $ret = $db->exec($sqlUpdate);

    $sqlModify = "INSERT INTO modifies VALUES(CURRENT_TIMESTAMP, '" . $_COOKIE['username'] . "', '" . $dorayaki . "', '" . $changed_stock . "', '" . $type . "')";

    $ret2 = $db->exec($sqlModify);

    if ($ret and $ret2) {
        echo json_encode(['changed' => 1]);
    } else {
        echo_json_encode(['changed' => 2]);
    }
?>