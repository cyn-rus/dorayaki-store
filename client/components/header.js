const isAdmin = getCookie('isadmin')

function renderHeader() {
    const header = document.getElementById('header')
    let child = `   <div class='search-bar'>
                        <input type="text" id='searchDorayaki' name='q'></input>
                    </div>`
        
    if (isAdmin === "1"){
        child += `<button class="button" onclick="window.location.href='add.html'">Add Dorayaki Variant</button>`
    }

    child += `
        <button onclick="window.location.href='dashboard.html'">Dashboard</button>
        <button onclick="window.location.href='history.html'">History</button>
        <form action='../../server/logout.php'>
            <input class="button" type='submit' value='Logout'>
        </form>
    `

    header.innerHTML = child

    const searchBar = document.getElementById('searchDorayaki');
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            window.location = `search.html?q=${e.target.value}`
        }
    });
}

renderHeader()