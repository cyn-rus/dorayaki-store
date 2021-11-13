<?php
    $found = 0;
    $dorayaki = $_REQUEST['name'];
    $changed_stock = $_REQUEST['stock'];

    $db = new SQLite3('../db/doraemonangis.sq3');

    $sqlUpdate = "UPDATE dorayakis
        SET stock = " . $changed_stock . "
        WHERE dorayaki_name = '" . $dorayaki . "' ";

    $ret = $db->exec($sqlUpdate);

    $sqlTransaction = "INSERT INTO transactions VALUES(CURRENT_TIMESTAMP, '" . $_COOKIE['username'] . "', '" . $dorayaki . "', '" . $changed_stock ."')";

    $ret2 = $db->exec($sqlTransaction);
        
    if ($ret and $ret2) {
        echo json_encode(['changed' => 1]);
    } else {
        echo json_encode(['changed' => 0]);
    }
?>