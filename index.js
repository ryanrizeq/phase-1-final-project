document.addEventListener('DOMContentLoaded', () => {
    // Event Listener for 
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(Object.values(data));
        })
})