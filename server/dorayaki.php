<?php
    $dorayakiId = $_REQUEST['id'];
    $db = new SQLite3('../db/doraemonangis.sq3');
    $sql = "SELECT dorayakis.dorayaki_name, IFNULL(SUM(amount), 0) as sold, description, image, price, stock 
            FROM dorayakis
            LEFT OUTER JOIN transactions
            ON dorayakis.dorayaki_name = transactions.dorayaki_name 
            WHERE dorayaki_id = $dorayakiId
            GROUP BY dorayaki_id";
    $result = $db->query($sql);

    $dorayakiDetails = [];
        while ($row = $result->fetchArray()) {
            $dorayakiDetails[] = [
                'name' => $row['dorayaki_name'],
                'sold' => $row['sold'],
                'description' => $row['description'],
                'price' => $row['price'],
                'image' => $row['image'],
                'stock' => $row['stock'],
            ];
        }
    
    echo json_encode($dorayakiDetails);
    echo json_encode([]);

?>