function redirectPage() {
    const username = getCookie('username')

    if (window.location.pathname.includes('index.html')) {
        if (username) {
            window.location = './pages/dashboard.html'
        } else {
            window.location = './pages/login.html'
        }
    } else if (window.location.pathname.includes('login.html')) {
        if (username !== "") {
            window.location = './dashboard.html'
        }
    } else if (window.location.pathname.includes('register.html')) {
        if (username !== "") {
            window.location = './dashboard.html'
        }
    } else {
        if (username === "" || username === null) {
            window.location = './login.html'
        } 
    }

}

redirectPage()