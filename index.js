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

                // Filter results to show drinks with three ingredients or less
                const filteredResults = results.filter(function (element) {
                    if (element['strIngredient4'] === null) {
                        return element;
                    }
                })
                
                for (const element of filteredResults) {
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

                        // Display first ingredient
                        const firstIngredient = document.createElement('li');
                        if (element['strMeasure1'] !== null) {
                            firstIngredient.innerText = `${element['strMeasure1']} ${element['strIngredient1']}`;
                        } else {
                            firstIngredient.innerText = `${element['strIngredient1']}`;
                        }
                        ingredientsList.appendChild(firstIngredient);

                        // Display second ingredient
                        const secondIngredient = document.createElement('li');
                        if (element['strIngredient2'] !== null) {
                            if (element['strMeasure2'] !== null) {
                                secondIngredient.innerText = `${element['strMeasure2']} ${element['strIngredient2']}`;
                            } else {
                                secondIngredient.innerText = `${element['strIngredient2']}`;
                            }
                            ingredientsList.appendChild(secondIngredient);
                        }

                        // Display third ingredient
                        const thirdIngredient = document.createElement('li');
                        if (element['strIngredient3'] !== null) {
                            if (element['strMeasure3'] !== null) {
                                thirdIngredient.innerText = `${element['strMeasure3']} ${element['strIngredient3']}`;
                            } else {
                                thirdIngredient.innerText = `${element['strIngredient3']}`;
                            }
                            ingredientsList.appendChild(thirdIngredient);
                        }
                    })
                }
            })
    })
})
