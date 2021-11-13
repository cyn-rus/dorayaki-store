<?php
    $isAdmin = $_COOKIE['isadmin'];

    $db = new SQLite3('../db/doraemonangis.sq3');

    if ($isAdmin == 1) {
        $sqlModifies = "SELECT * FROM modifies";
        $sqlTransactions = "SELECT * FROM transactions";

        $modifiesResult = $db->query($sqlModifies);
        $transactionsResult = $db->query($sqlTransactions);

        $history = [];
        while ($row = $modifiesResult->fetchArray()) {
            $history[] = [
                'date' => $row['date'],
                'username' => $row['username'],
                'dorayaki' => $row['dorayaki_name'],
                'action' => $row['type'],
                'amount' => $row['amount'],
            ];
        }

        while ($row = $transactionsResult->fetchArray()) {
            $history[] = [
                'date' => $row['date'],
                'username' => $row['username'],
                'dorayaki' => $row['dorayaki_name'],
                'action' => 'buy',
                'amount' => $row['amount'],
            ];
        }

        echo json_encode($history);

    } else {
        $username = $_COOKIE['username'];
        $sql = "SELECT * FROM transactions WHERE username = '" . $username . "'";

        $result = $db->query($sql);

        $history = [];
        while ($row = $result->fetchArray()) {
            $history[] = [
                'date' => $row['date'],
                'username' => $row['username'],
                'dorayaki' => $row['dorayaki_name'],
                'action' => 'buy',
                'amount' => $row['amount'],
            ];
        }

        echo json_encode($history);
    }
?>