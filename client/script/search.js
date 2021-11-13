function clearPage() {
    document.getElementById('paginationMenu').innerHTML = ''
    document.getElementsByTagName('p')[0].innerHTML = ''
}

async function renderSearch(dorayaki) {
    let currPage = 1
    const dorayakisPerPage = 2

    if (!dorayaki || dorayaki === '') {
        clearPage()
        return
    }

    const dorayakis = await fetchDatas(`searchDorayaki.php?q=${dorayaki}`)
    .then(data => {
        return parseDataFromAJAX(data)
    })

    const inputField = document.getElementById('searchDorayakiPage')
    inputField.value = dorayaki
    document.getElementById('searchDorayaki').value = dorayaki

    if (dorayakis.length === 0) {
        clearPage()
        document.getElementById('searchResult').innerHTML = 
        `
            <h2 class='no-result'>No search result for '${dorayaki}'</h2>
        `
        return
    }

    const totalPages = Math.ceil(dorayakis.length / dorayakisPerPage)
    const totalPagination = document.getElementById('totalPages')
    totalPagination.textContent = totalPages
    const previousButton = document.getElementById('previousButton')
    previousButton.onclick = function() {prevPage()}
    const nextButton = document.getElementById('nextButton')
    nextButton.onclick = function() {nextPage()}

    function prevPage() {
        if (currPage > 1) {
            currPage--
            renderPagination(currPage)
        }
    }

    function nextPage() {
        if (currPage < totalPages) {
            currPage++
            renderPagination(currPage)
        }
    }

    function renderPagination(idx) {
        const searchResult = document.getElementById('searchResult')
        const currPagination = document.getElementById('currPage')

        if (idx < 1) {
            idx = 1
            currPage = 1
        }

        if (idx > totalPages) {
            idx = totalPages
            currPage = totalPages
        }

        currPagination.textContent = idx

        searchResult.innerHTML = ''
        for (let i = (idx - 1) * dorayakisPerPage; i < (idx * dorayakisPerPage) && i < dorayakis.length; i++) {
            searchResult.innerHTML += renderDorayakiCard(dorayakis[i])
        }
    }

    function renderSelect() {
        const selectPagination = document.getElementById('selectPagination')
        selectPagination.innerHTML = ''
        for (let i = 1; i <= totalPages; i++) {
            const number = document.createElement('button')
            number.innerHTML = i + ' '
            number.id = 'pageNumber'
            number.onclick = function() {
                currPage = i
                renderPagination(i)
            }
            selectPagination.appendChild(number)
        }
    }

    renderSelect()
    renderPagination(currPage)
}

const dorayaki = window.location.search.split('=')[1]

renderSearch(dorayaki)