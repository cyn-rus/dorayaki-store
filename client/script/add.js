const nameSelect = document.getElementById('inputDorayakiName')

async function getRecipes() {
    const recipes = await fetchDatas('getRecipe.php')
        .then(data => {
            console.log(data)
            // return JSON.parse(data)
        })

    for (let i = 0; i < recipes.length; i++) {
        const option = document.createElement('option')
        option.value = recipes[i]
        option.text = capitalizeSentence(recipes[i])
        nameSelect.appendChild(option)
    }
}

getRecipes()