let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let userInput = document.getElementById("user-inp");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Function to handle search logic
function fetchRecipe() {
  let userInp = userInput.value.trim();
  if (userInp.length === 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        if (!data.meals) {
          result.innerHTML = `<h3>No Recipe Found</h3>`;
          return;
        }
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          if (i.startsWith("strIngredient") && myMeal[i]) {
            let ingredient = myMeal[i];
            let measure = myMeal[`strMeasure` + count];
            count++;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `<img src=${myMeal.strMealThumb}>
        <div class="details">
          <h2>${myMeal.strMeal}</h2>
          <h4>${myMeal.strArea}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe">
          <button id="hide-recipe">X</button>
          <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">Show Recipe</button>`;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>No Recipe Found</h3>`;
      });
  }
}

// Attach event listener to search button
searchBtn.addEventListener("click", fetchRecipe);

// Add event listener for "Enter" key on the input field
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchRecipe();
  }
});
var icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "sun.png";
  } else {
    icon.src = "moon.png";
  }
};
