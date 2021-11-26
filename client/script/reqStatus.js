

async function renderReqStatus(){
    let reqStatuses = await fetchDatas("reqStatus.php")
        .then(data =>{
            return JSON.parse(JSON.parse(data).return);
        })
    console.log(reqStatuses);
    // reqStatuses = JSON.parse(reqStatuses);

    // const xmlhttp = new XMLHttpRequest();
    console.log(reqStatuses.length);
    console.log(reqStatuses[0].request_name);
    // xmlhttp.onload = function() {
        // const reqStatuses = JSON.parse(this.responseText);
        // document.getElementById("demo").innerHTML = myObj.name;
    const table = document.getElementById("statusTable");
    for (let i = 0; i < reqStatuses.length; i++)
    {
        const row = table.insertRow();
        const cell = row.insertCell();
        if (reqStatuses[i].status === 220){
            reqStatuses[i].status = "Declined";
        } else if (reqStatuses[i].status === 320){
            reqStatuses[i].status = "Pending";
        } else {
            reqStatuses[i].status = "Accepted";
        }
        const child = `<div>${reqStatuses[i].request_name}</div><div>${reqStatuses[i].status}</div>`;
        cell.innerHTML = child;
    }
    // }
    // xmlhttp.open("GET", "reqStatus.php");
    // xmlhttp.send();
}


renderReqStatus();