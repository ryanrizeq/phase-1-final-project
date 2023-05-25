document.addEventListener('DOMContentLoaded', () => {
    const searchByName = document.getElementById('search-by-name');
    const resultsDisplay = document.getElementById('results-display');
    
    searchByName.addEventListener('submit', (event) => {
        event.preventDefault()
        
        const searchValue = searchByName.elements['drink-by-name'].value;
        
        document.getElementById('search-results').remove()

        const display = document.createElement('ul');
        display.id = 'search-results';
        resultsDisplay.append(display);

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const results = Object.values(data)[0];
                
                const filteredResults = results.filter(function (element) {
                    if (element['strIngredient4'] === null) {
                        return element;
                    }
                })

                if (filteredResults.length === 0) {
                    const nothingFound = document.createElement('h4').innerText = 'No cocktails found :(';
                    display.append(nothingFound);

                } else {
                    for (const element of filteredResults) {
                        const drinkName = document.createElement('h4');
                        drinkName.innerText = element['strDrink'];
                        display.append(drinkName);
    
                        drinkName.addEventListener('mouseover', () => {
                            drinkName.style.color = '#0049B7';
                        })
    
                        drinkName.addEventListener('mouseout', () => {
                            drinkName.style.color = 'black';
                        })
    
                        drinkName.addEventListener('click', () => {
                            const drinkInfo = document.createElement('ul');
                            drinkName.append(drinkInfo);
                            
                            const cocktailImage = document.createElement('img');
                            cocktailImage.src = `${element['strDrinkThumb']}`;
                            cocktailImage.id = 'image'
                            drinkInfo.appendChild(cocktailImage);

                            const glassInfo = document.createElement('li');
                            glassInfo.innerText = `Drink Glass: ${element['strGlass']}`;
                            drinkInfo.appendChild(glassInfo); 
    
                            const ingredients = document.createElement('li');
                            ingredients.innerText = 'Ingredients';
                            const ingredientsList = document.createElement('ul');
                            drinkInfo.appendChild(ingredients);
                            ingredients.appendChild(ingredientsList);
    
                            const firstIngredient = document.createElement('li');
                            if (element['strMeasure1'] !== null) {
                                firstIngredient.innerText = `${element['strMeasure1']} ${element['strIngredient1']}`;
                            } else {
                                firstIngredient.innerText = `${element['strIngredient1']}`;
                            }
                            ingredientsList.appendChild(firstIngredient);
    
                            const secondIngredient = document.createElement('li');
                            if (element['strIngredient2'] !== null) {
                                if (element['strMeasure2'] !== null) {
                                    secondIngredient.innerText = `${element['strMeasure2']} ${element['strIngredient2']}`;
                                } else {
                                    secondIngredient.innerText = `${element['strIngredient2']}`;
                                }
                                ingredientsList.appendChild(secondIngredient);
                            }
    
                            const thirdIngredient = document.createElement('li');
                            if (element['strIngredient3'] !== null) {
                                if (element['strMeasure3'] !== null) {
                                    thirdIngredient.innerText = `${element['strMeasure3']} ${element['strIngredient3']}`;
                                } else {
                                    thirdIngredient.innerText = `${element['strIngredient3']}`;
                                }
                                ingredientsList.appendChild(thirdIngredient);
                            }
    
                            const instructions = document.createElement('li');
                            instructions.innerText = `Instructions: ${element['strInstructions']}`;
                            drinkInfo.appendChild(instructions);
                        })
                    }
                }
            })
    })
})
