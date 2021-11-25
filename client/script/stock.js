const imgPath = '../../db/images/'

function isStockValid(availableStock, currStock) {
    if (currStock >= 0 && currStock <= availableStock) return true
    if (currStock >= availableStock && isAdmin === '1') return true
    return false
}

function changeStock(price, stock) {
    let totalPrice = price * stock
    document.getElementById('dorayakiTotalPrice').innerHTML = totalPrice
    document.getElementById('currStock').innerHTML = stock
}

async function renderStock(dorayakiID) {
    document.title = (isAdmin === '1' ? 'Change Dorayaki Stock' : 'Buy Dorayaki') + ' | Mahi Mahi'

    const dorayaki = await fetchDatas(`helper/getDorayakiByID.php?q=${dorayakiID}`)
        .then(data => {
            return parseDataFromAJAX(data)[0]
        })
    
    if (!dorayaki) {
        document.getElementById('container').innerHTML = `
            <h1>
                Page not found!
            </h1>
        `
        return
    }

    let availableStock = dorayaki.stock
    let currStock = isAdmin === '1' ? dorayaki.stock : 0
    const successText = document.getElementById('successText')

    function reduceStock() {
        if (isStockValid(availableStock, currStock-1)) {
            currStock--
            addButton.disabled = false
            submitButton.disabled = currStock === availableStock || (currStock === 0 && isAdmin !== '1') ? true : false
            successText.style.opacity = 0
            changeStock(dorayaki.price, currStock)

            if (currStock === 0) {
                reduceButton.disabled = true
            }
        }
    }

    function addStock() {
        if (isStockValid(availableStock, currStock+1)) {
            currStock++
            reduceButton.disabled = false
            submitButton.disabled = currStock === availableStock ? (isAdmin === '1' ? true : false) : (false)
            successText.style.opacity = 0
            changeStock(dorayaki.price, currStock)

            if (currStock >= availableStock && isAdmin !== '1') {
                addButton.disabled = true
            }
        }
    }

    document.getElementById('stockImg').src = imgPath + dorayaki.image
    document.getElementById('stockImg').alt = capitalizeSentence(dorayaki.name)
    document.getElementById('dorayakiName').innerHTML = capitalizeSentence(dorayaki.name)
    document.getElementById('changeStockText').innerHTML = isAdmin === '1' ? 'Change Dorayaki Stock' : 'Buy Dorayaki'
    const dorayakiAvailableStock = document.getElementById('dorayakiAvailableStock')
    dorayakiAvailableStock.innerHTML = availableStock
    const dorayakiCurrentStock = document.getElementById('currStock')
    dorayakiCurrentStock.innerHTML = currStock

    if (isAdmin === '1') {
        document.getElementById('dorayakiPrice').style.display = 'none'
        document.getElementById('changeStockPrice').style.display = 'none'
        successText.innerHTML = 'Stock changed successfully!'
    } else {
        document.getElementById('dorayakiPriceSpan').innerHTML = dorayaki.price
        document.getElementById('dorayakiTotalPrice').innerHTML = dorayaki.price * currStock
        successText.innerHTML = 'Bought successfully!<br>Thank you for purchasing!'
    }
    
    const reduceButton = document.getElementById('reduceStock')    
    if (currStock === 0) {
        reduceButton.disabled = true
    }
    reduceButton.onclick = function() {reduceStock()}

    const addButton = document.getElementById('addStock')
    addButton.onclick = function() {addStock()}

    const submitButton = document.getElementById('submitStock')
    submitButton.onclick = async function() {
        try {
            const changedStock = Math.abs(availableStock - currStock)
            const endpoint = isAdmin === '1' ? `changeStock.php?name=${dorayaki.name}&stock=${changedStock}&type=${currStock > availableStock ? 'add' : 'reduce'}` : `buyDorayaki.php?name=${dorayaki.name}&stock=${changedStock}`

            await fetchDatas(endpoint)
                .then(data => {
                    return JSON.parse(data)
                })
           
            successText.style.opacity = 1
            
            if (isAdmin === '1') {
                availableStock = currStock
            } else {
                availableStock -= currStock
                currStock = 0
                dorayakiCurrentStock.innerHTML = currStock
                reduceButton.disabled = true
                document.getElementById('dorayakiTotalPrice').innerHTML = 0
            }

            dorayakiAvailableStock.innerHTML = availableStock
            submitButton.disabled = true
        } catch(err) {
            successText.style.opacity = 1
            successText.innerHTML = isAdmin === '1' ? 'Dorayaki stock not successfully changed!' : 'Dorayaki not bought successfully!'
        }
    }
}

const params = window.location.search
const i = params.split('=')[1]
renderStock(i)