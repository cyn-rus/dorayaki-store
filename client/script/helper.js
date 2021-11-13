function getDorayakis() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'getDorayakis.php')

    xhr.onload = function() {
        return this.responseText
    }
    xhr.send()
    return []
}

function fetchDatas(destination) {
    return new Promise(function (resolve, reject) {
        const objXMLHttpRequest = new XMLHttpRequest()

        objXMLHttpRequest.onreadystatechange = function() {
            if (objXMLHttpRequest.readyState === 4) {
                if (objXMLHttpRequest.status === 200) {
                    resolve(objXMLHttpRequest.responseText)
                } else {
                    reject('Error code: ' + objXMLHttpRequest.status + '\nError message: ' + objXMLHttpRequest.statusText)
                }
            }
        }

        objXMLHttpRequest.open('GET', `../../server/${destination}`, true)
        objXMLHttpRequest.send()
    })
}

function parseDataFromAJAX(string) {
    const parsed = JSON.parse(string.slice(0, -2))
    return parsed
}

function capitalizeSentence(string) {
    const words = string.split(' ')

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
    }
    
    return words.join(' ')
}

function getCookie(cookieName) {
    let name = cookieName + "="
    let cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return ""
}

function bubbleSort(arr, key) {
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j][key] > arr[j+1][key]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr
}