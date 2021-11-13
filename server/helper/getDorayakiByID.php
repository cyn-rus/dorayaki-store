<?php
    $dorayaki = $_REQUEST['q'];

    if ($dorayaki !== '') {
        $db = new SQLite3('../../db/doraemonangis.sq3');
        $sql = "SELECT * FROM dorayakis WHERE dorayaki_id='" . $dorayaki . "'";
        $result = $db->query($sql);
    
        $dorayakis = [];
        while ($row = $result->fetchArray()) {
            $dorayakis[] = [
                'name' => $row['dorayaki_name'],
                'description' => $row['description'],
                'image' => $row['image'],
                'price' => $row['price'],
                'stock' => $row['stock'],
            ];
        }
    
        echo json_encode($dorayakis);
    }
    echo json_encode([]);
?>