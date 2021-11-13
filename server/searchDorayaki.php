<?php
    $dorayaki = $_REQUEST['q'];
    $found = 0;

    if ($dorayaki !== '') {
        $db = new SQLite3('../db/doraemonangis.sq3');
        $sql = "SELECT dorayaki_id, dorayakis.dorayaki_name, IFNULL(SUM(amount), 0) as sold, description, image
                FROM dorayakis LEFT OUTER JOIN transactions ON dorayakis.dorayaki_name = transactions.dorayaki_name
                WHERE dorayakis.dorayaki_name LIKE '%" . $dorayaki . "%'
                GROUP BY dorayaki_id
                ORDER BY SUM(amount) DESC";

        $result = $db->query($sql);
    
        $dorayakis = [];
        while ($row = $result->fetchArray()) {
            $dorayakis[] = [
                'id' => $row['dorayaki_id'],
                'name' => $row['dorayaki_name'],
                'sold' => $row['sold'],
                'description' => $row['description'],
                'image' => $row['image'],
            ];
        }
    
        echo json_encode($dorayakis);
    }
    echo json_encode([])
?>