async function getHistory() {
    const containerHistory = document.getElementById('tableHistory')

    let listHistory = await fetchDatas('history.php')
        .then(data => {
            const parsedData = JSON.parse(data)
            return bubbleSort(parsedData, 'date')
        })

    const isAdmin = getCookie("isadmin")

    if (isAdmin === "1") {
        const row = tableHistory.insertRow(0);

        const cellDate = row.insertCell(0);
        const cellUsername = row.insertCell(1);
        const cellDorayakiName = row.insertCell(2);
        const cellAction = row.insertCell(3);
        const cellAmount = row.insertCell(4);

        cellDate.innerHTML = "Date";
        cellUsername.innerHTML = "Username";
        cellDorayakiName.innerHTML = "Dorayaki Name";
        cellAction.innerHTML = "Action";
        cellAmount.innerHTML = "Amount";
    } else {
        const row = tableHistory.insertRow(0);

        const cellDate = row.insertCell(0);
        const cellDorayakiName = row.insertCell(1);
        const cellAmount = row.insertCell(2);

        cellDate.innerHTML = "Date";
        cellDorayakiName.innerHTML = "Dorayaki Name";
        cellAmount.innerHTML = "Amount";
    }

    for (let i = 0; i < listHistory.length; i++) {
        if (isAdmin === "1") {
            const row = tableHistory.insertRow();

            const cellDate = row.insertCell(0);
            const cellUsername = row.insertCell(1);
            const cellDorayakiName = row.insertCell(2);
            const cellAction = row.insertCell(3);
            const cellAmount = row.insertCell(4);

            cellDate.innerHTML = listHistory[i]["date"];
            cellUsername.innerHTML = listHistory[i]["username"];
            cellDorayakiName.innerHTML = capitalizeSentence(listHistory[i]["dorayaki"]);
            cellAction.innerHTML = capitalizeSentence(listHistory[i]["action"]);
            cellAmount.innerHTML = listHistory[i]["amount"];
        } else {
            const row = tableHistory.insertRow();

            const cellDate = row.insertCell(0);
            const cellDorayakiName = row.insertCell(1);
            const cellAmount = row.insertCell(2);

            cellDate.innerHTML = listHistory[i]["date"];
            cellDorayakiName.innerHTML = listHistory[i]["dorayaki"];
            cellAmount.innerHTML = listHistory[i]["amount"];
        }
        
    }
}

getHistory()