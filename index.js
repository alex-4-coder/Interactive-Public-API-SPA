const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const recipeList = document.getElementById("recipe-list");

// Search button click event
searchBtn.addEventListener("click", () => {
  const searchTerm = input.value.trim();
  if (searchTerm) {
    fetchRecipes(searchTerm);
  }
});

// Fetch recipes from MealDB API
function fetchRecipes(query) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => {
      renderRecipes(data.meals);
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);
      recipeList.innerHTML = "<p>Something went wrong. Try again.</p>";
    });
}

// Render recipes to the DOM
function renderRecipes(meals) {
  recipeList.innerHTML = ""; // clear previous results

  if (!meals) {
    recipeList.innerHTML = "<p>No recipes found. Try another search!</p>";
    return;
  }

  meals.forEach(meal => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");

    recipeDiv.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <a href="${meal.strSource || meal.strYoutube}" target="_blank">📖 View Recipe</a>
    `;

    recipeList.appendChild(recipeDiv);
  });
}
