document.addEventListener('DOMContentLoaded', () => {
    // Event Listener for Search by Cocktail Name
    const searchByName = document.getElementById('search-by-name');
    searchByName.addEventListener('submit', (event) => {
        event.preventDefault(); 
        console.log('I have been searched!')
    })
})

    // fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=tequila")
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(data) {
    //         console.log(Object.values(data));
    //     })
