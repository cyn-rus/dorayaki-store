

async function renderReqStatus(){
    let reqStatuses = await fetchDatas("reqStatus.php");
    reqStatuses = JSON.parse(reqStatuses);

    // const xmlhttp = new XMLHttpRequest();

    // xmlhttp.onload = function() {
        // const reqStatuses = JSON.parse(this.responseText);
        // document.getElementById("demo").innerHTML = myObj.name;
    const table = document.getElementById("statusTable");
    for (let i = 0; i < reqStatuses.length; i++)
    {
        const row = table.insertRow();
        const cell = row.insertCell();
        const child = `<div>${reqStatuses[i].request_name}</div><div>${reqStatuses[i].status}</div>`;
        cell.innerHTML = child;
    }
    // }
    // xmlhttp.open("GET", "reqStatus.php");
    // xmlhttp.send();
}


renderReqStatus();