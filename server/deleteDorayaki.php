<?php
    $dorayakiId = $_REQUEST['id'];
    $db = new SQLite3('../db/doraemonangis.sq3');
    $sql = "DELETE FROM dorayakis WHERE dorayaki_id = $dorayakiId";
    $ret = $db->exec($sql);

    header("location:../client/pages/dashboard.html");
?>