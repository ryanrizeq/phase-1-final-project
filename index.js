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

                results.filter(function (element) {
                    if (element['strIngredient4'] === null) {
                        return element;
                    }
                })
                
                for (const element of results) {
                    // Display drink name list of results
                    const drinkName = document.createElement('h4');
                    drinkName.innerText = element['strDrink'];
                    display.appendChild(drinkName);

                    // Event listener for click on list of names
                    drinkName.addEventListener('click', () => {
                        // Create unordered list for drink information
                        const drinkInfo = document.createElement('ul');
                        drinkName.appendChild(drinkInfo);

                        // Display drink glass information
                        const glassInfo = document.createElement('li');
                        glassInfo.innerText = `Drink Glass: ${element['strGlass']}`;
                        drinkInfo.appendChild(glassInfo); 

                        // Display instructions information
                        const instructions = document.createElement('li');
                        instructions.innerText = `Instructions: ${element['strInstructions']}`;
                        drinkInfo.appendChild(instructions);

                        // Create Ingredients information shell
                        const ingredients = document.createElement('li');
                        ingredients.innerText = 'Ingredients';
                        const ingredientsList = document.createElement('ul');
                        drinkInfo.appendChild(ingredients);
                        ingredients.appendChild(ingredientsList);


                    })
                }
            })
    })
})
