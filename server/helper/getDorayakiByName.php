<!-- belom fiks, ganti2 aja -->

<?php
    $found = 0;
    $dorayaki = 'abc';

    $db = new SQLite3('../../db/doraemonangis.sq3');
    $sql = "SELECT * FROM dorayakis WHERE dorayaki_name='" . $dorayaki . "'";
    $result = $db->query($sql);

    $dorayakis = [];
    while ($row = $result->fetchArray()) {
        $dorayakis[] = [
            'name' => $row['dorayaki_name'],
            'description' => $row['description'],
            'image' => $row['image'],
            'price' => $row['price'],
            'stock' => $row['stock'],
        ]
    }

    echo json_encode($dorayakis);

?>