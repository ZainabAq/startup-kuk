import {readDocument, writeDocument, addDocument, getCollection} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

/**
 * Given a recipe ID, returns a recipe object with references resolved.
 * Internal to the server, since it's synchronous.
 */
function getRecipeSync(recipeId) {
  var recipe = readDocument('recipe', recipeId);
  return recipe;
}

function getCalendarSync(calendarId) {
  var calendar = readDocument('calendar',calendarId);
  // Resolve meals
  Object.keys(calendar.contents).map((day) => {
    calendar.contents[day].map((meal, i) => {
      // i is the meal's index
      calendar.contents[day][i] = getRecipeSync(meal);
    })
  })
  return calendar;
}

function getProfileSync(userId) {
  var userItem = readDocument('users', userId);
  // Resolve calendar
  userItem.calendar = getCalendarSync(userItem.calendar);
  return userItem;
}

/**
 * Gets next 4 meals for a particular user.
 * @param userId The ID of the user whose calendar we are requesting.
 * @returns A 4-element array of the next 4 meals.
 */
function getUpcomingMeals(userId) {
  // Get the User object with the id "userId".
  var userData = readDocument('users', userId);
  // Get the calendar for the user.
  var calendar = readDocument('calendar',userData.calendar);
  // For now, static date is Monday.
  var meals = [];
  calendar.contents.Monday.forEach((recipeId) => {
    meals.push(getRecipeSync(recipeId));
  })
  return meals;
}

export function getProfileData(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Resolve profile data
  userData = getProfileSync(user);
  // Add upcoming meals
  userData.upcomingMeals = getUpcomingMeals(user)
  // Return FeedData with resolved references.
  emulateServerReturn(userData, cb);
}

//need functions to addFavorites, addRating, addMealstoCalendar, getRecipeInformation
//modifyRestrictions (for the profile)
export function getRecipe(recipeId, cb) {
   //get the recipe object with the correct id
   var recipeData = readDocument('recipe', recipeId);
   emulateServerReturn(recipeData, cb);

}

export function getFeedData(amountofRecipes, cb) {
  // Get the recipe collection
  var feedData = getCollection('recipe');
  var i=1, recipeList=[];

  // get an arbitray number of recipes and their specific properties
  while(amountofRecipes != 0) {
    recipeList.push([feedData[i]._id, feedData[i].name, feedData[i].img, feedData[i].description, feedData[i].time]);
    i++;
    amountofRecipes--;
  }
  emulateServerReturn(recipeList, cb);
}

/**
 * Returns an array of the recipes whose names match the searched keyword.
 */
export function findRecipe(searchText, cb) {
  var recipes = getCollection('recipe');
  // append all recipes in an array
  var i, recipeData = [];
  for (i in recipes) {
    if (recipes.hasOwnProperty(i)) {
      recipeData.push(recipes[i]);
    }
  }
  // if recipe name matches search word, append its id
  var j, match = [];
  for (j=0; j<recipeData.length; j++) {
    if (searchText == recipeData[j].name) {
      match.push(recipeData[j]._id);
    }
  }
  // map each recipe id
  match.map((recipe, k) => {
    // k is the index
    match[k] = getRecipeSync(recipe);
  });
  // match = wanted recipe
  emulateServerReturn(match, cb);
}
