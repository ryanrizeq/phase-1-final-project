document.addEventListener('DOMContentLoaded', () => {
    // Event Listener for Search by Cocktail Name
    const searchByName = document.getElementById('search-by-name');
    searchByName.addEventListener('submit', (event) => {
        event.preventDefault()
        // Save search information
        const searchValue = searchByName.elements['drink-by-name'].value;

        // Fetch data using saved search information
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const results = Object.values(data)[0];
                const display = document.getElementById('search-results');
                
                for (const element of results) {
                    // Display drink name list of results
                    const drinkName = document.createElement('li');
                    drinkName.innerText = element['strDrink'];
                    display.appendChild(drinkName);
                }

                // 
            })
    })
})
