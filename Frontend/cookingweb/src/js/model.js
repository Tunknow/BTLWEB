import { API_URL, RES_PER_PAGE } from './config';
import { AJAX } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObj = function (data) {
  // const { recipe } = data.data;
  const recipe = data;
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image_url,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    ingredients: recipe.ingredients,
    cookingTime: recipe.cooking_time,
  };
};

export const loadRecipe = async function (id) {
  try {
    // HELPER Json returner
    const data = await AJAX(`${API_URL}/${id}`);

    state.recipe = createRecipeObj(data);

    const founded = state.bookmarks.findIndex(
      item => item.id === state.recipe.id
    );

    founded === -1
      ? (state.recipe.bookmarked = false)
      : (state.recipe.bookmarked = true);
  } catch (err) {
    throw err;
  }
};

export const loadSearch = async function (search) {
  try {
    // HELPER Json returner
    const data = await AJAX(`${API_URL}?search=${search}`);

    state.search.page = 1;

    if (!data.results) throw err;

    state.search.query = search;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (ser = 4) {
  if (ser < 1) return;

  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * ser) / state.recipe.servings;
  });
  state.recipe.servings = ser;
};

const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
    state.bookmarks.push(recipe);
    persistBookmark();
  }
};

export const deleteBookmark = function (id) {
  const founded = state.bookmarks.findIndex(el => el.id === id);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
    state.bookmarks.splice(founded, 1);
    persistBookmark();
  }
};

(function () {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  if (!bookmarks) return;

  state.bookmarks = bookmarks;
})();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// export const uploadRecipe = async function (newRecipe) {
//   try {
//     const ingredients = Object.entries(newRecipe)
//       .filter(el => el[0].startsWith('ingredient') && el[1] !== '')
//       .map(el => {
//         // const ingArr = el[1].replaceAll(' ', '').split(',');
//         const ingArr = el[1].split(',').map(el => el.trim());

//         if (ingArr.length !== 3) throw err;

//         const [quantity, unit, description] = ingArr;
//         return {
//           quantity: +quantity || null,
//           unit: unit || null,
//           description: description || null,
//         };
//       });

//     const addRecipe = {
//       title: newRecipe.title,
//       image_url: newRecipe.image,
//       publisher: newRecipe.publisher,
//       servings: +newRecipe.servings,
//       source_url: newRecipe.sourceUrl,
//       cooking_time: +newRecipe.cookingTime,
//       ingredients: ingredients,
//     };

//     console.log(addRecipe);

//     const data = await AJAX(`${API_URL}`, addRecipe);

//     state.recipe = createRecipeObj(data);

  
//     addBookmark(state.recipe);
//   } catch (err) {
//     throw err;
//   }
// };

export const uploadRecipe = async function (newRecipe) {
  try {
    if (!newRecipe.title || !newRecipe.publisher) {
      throw new Error('Title and publisher must not be empty');
    }

    const ingredients = [];
    for (let i = 1; i <= 6; i++) {
      const ingredientField = newRecipe[`ingredient-${i}`];
      if (ingredientField) {
        const ingArr = ingredientField.split(';').map(el => el.trim());

        if (ingArr.length === 3) {
          const [quantity, unit, description] = ingArr;
          ingredients.push({
            quantity: +quantity || null,
            unit: unit || "",
            description: description || "",
          });
        } else {
          throw new Error("Dữ liệu nhập không đúng định dạng yêu cầu!");
        }
      }
    }

    const addRecipe = {
      title: newRecipe.title,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      cooking_time: +newRecipe.cookingTime,
      ingredients: ingredients,
    };

    const data = await AJAX(`${API_URL}`, addRecipe);
    console.log(data)
    const createdRecipe = createRecipeObj(data);
    state.recipe = createdRecipe;

    addBookmark(state.recipe);

    return createdRecipe;
  } catch (err) {
    throw err;
  }
};

