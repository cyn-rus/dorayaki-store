function confirmDelete(){
    let deleteConfirmation = confirm("Are you sure you want to delete this dorayaki variant?")
    if (deleteConfirmation == true){
        const paramString = window.location.search
        const searchParams = new URLSearchParams(paramString)
        const dorayakiId = searchParams.get("id")

        alert("Dorayaki variant deleted")
        window.location = `../../server/deleteDorayaki.php?id=${dorayakiId}`

    }
    else{
        alert("Deletion canceled")
    }
}

async function renderDorayakiPage() {
    const paramString = window.location.search
    const searchParams = new URLSearchParams(paramString)
    const dorayakiId = searchParams.get("id")
    
    const dorayakiDetails = await fetchDatas(`dorayaki.php?id=${dorayakiId}`)
    .then(data =>{
        return parseDataFromAJAX(data)
    })

    const dorayakiDetailsContainer = document.getElementById('container')
    const imgPath = '../../db/images/'

    let child = `<img src='${imgPath + dorayakiDetails[0].image}' alt=${capitalizeSentence(dorayakiDetails[0].name)}>
                    <h1>${dorayakiDetails[0].name}</h1>
                    <div>${dorayakiDetails[0].description}</div>
                    <div>Price: ${dorayakiDetails[0].price}</div>
                    <div>Stock: ${dorayakiDetails[0].stock}</div>
                    <div>Sold: ${dorayakiDetails[0].sold}</div>`

    const isAdmin = getCookie("isadmin")
    
    if (isAdmin === "1"){
        child += `<button class='changeStockButton' onclick="window.location.href='stock.html?id=${dorayakiId}'">Change Stock</button>`
        child += `<button class='deleteButton' onclick="confirmDelete()">Delete</button>`
    }
    else{
        child += `<button class='buyButton' onclick="window.location.href='stock.html?id=${dorayakiId}'">Buy</button>`
    }

    child += `<button class='backButton' onclick="window.location.href='./dashboard.html'">Back</button>`

    dorayakiDetailsContainer.innerHTML += child

}

renderDorayakiPage()


