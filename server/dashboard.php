<?php
    $maxDorayaki = $_REQUEST['max'];
    $db = new SQLite3('../db/doraemonangis.sq3');
    $sql = "SELECT dorayaki_id, dorayakis.dorayaki_name, IFNULL(SUM(amount), 0) as sold, description, image 
            FROM dorayakis
            LEFT OUTER JOIN transactions
            ON dorayakis.dorayaki_name = transactions.dorayaki_name 
            GROUP BY dorayaki_id 
            ORDER BY SUM(amount) DESC 
            LIMIT $maxDorayaki";
    $result = $db->query($sql);

    $popularDorayakis = [];
        while ($row = $result->fetchArray()) {
            $popularDorayakis[] = [
                'id' => $row['dorayaki_id'],
                'name' => $row['dorayaki_name'],
                'sold' => $row['sold'],
                'description' => $row['description'],
                'image' => $row['image'],
            ];
        }
    
    echo json_encode($popularDorayakis);
    echo json_encode([])
?>