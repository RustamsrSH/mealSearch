'use strict'

const mealList = document.querySelector('.meal-cards');
const ingredient = document.querySelector('.mealSearch__ingredient');
const button = document.querySelector('.mealSearch__button');

button.addEventListener('click', getMealList);

function getMealList() {
  mealList.innerHTML = '';
  let searchWord = ingredient.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchWord}`)
  .then(response => response.json())
  .then(data => {
    data.meals.map((item) => {
      let meal =  document.createElement('li');
      meal.classList.add('meal-cards__item', 'meal-item');
      meal.innerHTML = `
        <img src="${item.strMealThumb}" width="100%">
        <p>${item.strMeal}</p>
        <button class="meal-item__button" id=${item.idMeal} onclick="getModal(${item.idMeal})">Get Recipe</button>
      `;
      mealList.append(meal);
    })
  })
  .catch(err => {
    mealList.innerHTML = `
      <p class="meal-cards__error">Sorry, we didn't find any meal!</p>
    `;
    console.log(err);
  })
}


const modal = document.querySelector('.recipe-modal');

function getModal(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then(response => response.json())
  .then(data => {
    modal.style.display = 'flex';
    modal.innerHTML = `
      <h2 class="recipe-modal__title">${data.meals[0].strMeal}</h2>
      <p class="recipe-modal__text">${data.meals[0].strInstructions}</p>
      <img src="${data.meals[0].strMealThumb}" alt="meal image" class="recipe-modal__img">
      <button class="recipe-modal__close-button" onclick="modalClose()">CLOSE</button>
    `;
})
}

function modalClose() {
  modal.style.display = 'none';
}


// Fetch запросы

    // {
    // json.map (item => {
    //   const post = document.createElement('li');
    //   post.classList.add('card');
    //   post.innerHTML = item.title;
    //   postList.append(post);
    // })


// fetch('https://jsonplaceholder.typicode.com/users/8', {
//   method: 'DELETE',
//   headers: {
//     'Content-type': 'application/json'
//   },
//   // body: JSON.stringify(body)
// }).then(response => response.json())
//   .then(json => console.log(json));
