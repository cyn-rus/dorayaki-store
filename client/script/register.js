function checkUsername(str) {
    const usernameRegex = /^[a-zA-Z0-9_]*$/
    if (str.includes(' ')) return false
    if (str === '') return false
    if (!usernameRegex.test(String(str))) return false
    return true
}

async function checkAvailability() {
    const inputUsername = document.getElementById('inputUsername')
    const username = inputUsername.value

    const availability = await fetchDatas(`check_availability.php?q=${username}`)
        .then(data => {
            try {
                return JSON.parse(data)
            } catch {
                return ''
            }
        })


    const found = !(availability.found) && checkUsername(username)
    
    const status = document.getElementById('status')

    
    if (!found) {
        inputUsername.style.border = "2px solid red"
        status.style.opacity = 1
    } else {
        inputUsername.style.border = "2px solid rgb(87, 247, 111)"
        status.style.opacity = 0
    }
}

function checkEmail() {
    const validity = document.getElementById('validity')

    const inputEmail = document.getElementById('inputEmail')
    const email = inputEmail.value

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValid = emailRegex.test(String(email).toLowerCase())

    if (isValid) {
        
        inputEmail.style.border = '2px solid rgb(87, 247, 111)'
        validity.style.opacity = 0
    } else {
        inputEmail.style.border = '2px solid red'
        validity.style.opacity = 1
    }
}

const inputUsername = document.getElementById('inputUsername')
inputUsername.onblur = function() {checkAvailability()}
const inputEmail = document.getElementById('inputEmail')
inputEmail.onblur = function() {checkEmail()}