import {readDocument, writeDocument, getCollection} from './database.js';

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

// function getCalendarSync(calendarId) {
//   var calendar = readDocument('calendar',calendarId);
//   // Resolve meals
//   Object.keys(calendar.contents).map((day) => {
//     calendar.contents[day].map((meal, i) => {
//       // i is the meal's index
//       calendar.contents[day][i] = getRecipeSync(meal);
//     })
//   })
//   return calendar;
// }

function getProfileSync(userId) {
  var userItem = readDocument('users', userId);
  // Resolve calendar
  //userItem.calendar = getCalendarSync(userItem.calendar);
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
  calendar.Monday.forEach((recipeId) => {
    meals.push(getRecipeSync(recipeId));
  })
  return meals;
}

/**
* Gets the day's calendar for a particular user.
* @param calendarId and the day
* @returns A 4-element array of that day's meals
*/

function getCalendarData(userId, week) {
  //var userData = readDocument('users', userId);
  var calendar = readDocument('calendar', week);
  var meals = [];
  calendar.Monday.forEach((recipeId) => {
    meals.push(getRecipeSync(recipeId));
  })
  return meals;

}

// function getCalendarData(userId, week) {
//   //var userData = readDocument('users', userId);
//   var calendar = readDocument ('calendar', week);
//   return calendar;
// }

/**
 * @param id An array of the ids of the restrictions to get
 * @returns An array holding the tag names of the restriction ids passed in
 */
function getRestrictionStrings(ids) {
  var strings = [];
  ids.forEach((id => {
    var restrictionData = readDocument("restrictions",id);
    strings.push(restrictionData.tag);
  }));
  return strings;
}

/**
 * @param user The id of the user
 * @param cb The callback function to be called at the end
 * Calls cb on a UserData object that is resolved except for the restriction references.
 */
export function getProfileData(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Resolve profile data
  userData = getProfileSync(user);
  // Add upcoming meals
  userData.upcomingMeals = getUpcomingMeals(user);
  // Return UserData with resolved references.
  emulateServerReturn(userData, cb);
}

export function getProfileCalendarData(user, week, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Resolve profile data
  userData = getProfileSync(user);
  // Add upcoming calendar
  userData.Monday = getCalendarData(user, week);
  userData.Tuesday = getCalendarData(user, week);
  userData.Wednesday = getCalendarData(user, week);
  userData.Thursday = getCalendarData(user, week);
  userData.Friday = getCalendarData(user, week);
  userData.Saturday = getCalendarData(user, week);
  userData.Sunday = getCalendarData(user, week);
  // Return UserData with resolved references.
  emulateServerReturn(userData, cb);
}

// export function getProfileCalendarData(user, week, cb) {
//   // Get the User object with the id "user".
//   var userData = readDocument('users', user);
//   // Resolve profile data
//   userData = getProfileSync(user);
//   // Add upcoming calendar
//   userData.calendar = getCalendarData(user, week);
//   // Return UserData with resolved references.
//   emulateServerReturn(userData, cb);
// }

//need functions to addFavorites, addRating, addMealstoCalendar, getRecipeInformation
//modifyRestrictions (for the profile)
export function getRecipe(recipeId, cb) {
   //get the recipe object with the correct id
   var recipeData = readDocument('recipe', recipeId);
   emulateServerReturn(recipeData, cb);
}

/**
 * @param user The id of the user
 * @param cb The callback function to be called at the end
 */
export function getUserRestrictions(user, cb) {
  var userData = readDocument("users", user);
  var restrictions = userData.restrictions;
  restrictions = getRestrictionStrings(restrictions);
  emulateServerReturn(restrictions, cb);
}

/**
 * @param checkbox The DOM object triggering this call
 * @param userId The id of the user whose restrictions are to be modified
 * @param cb The callback function to be called at the end
 * Calls cb on an object holding the user's modified restrictions array (unresolved)
 * and the checkbox.
 */
export function addUserRestriction(checkbox, userId, cb) {
  var restrictionId = checkbox.value;
  var userData = readDocument("users", userId);
  userData.restrictions.push(restrictionId);
  writeDocument('users', userData);
  var result = {"restrictions":userData.restrictions, "target":checkbox};
  emulateServerReturn(result, cb);
}

/**
 * @param restrictionId The id of the restriction to be removed
 * @param userId The id of the user whose restrictions are to be modified
 * @param cb The callback function to be called at the end
 * Calls cb on an object holding the user's modified restrictions array (unresolved)
 * and the checkbox.
 */
export function removeUserRestriction(checkbox, userId, cb) {
  var restrictionId = checkbox.value;
  var userData = readDocument('users', userId);
  var restrictionIndex = userData.restrictions.indexOf(restrictionId);
  if (restrictionIndex != -1) {
    userData.restrictions.splice(restrictionIndex, 1);
    writeDocument('users', userData);
  }
  var result = {"restrictions":userData.restrictions, "target":checkbox};
  emulateServerReturn(result, cb);
}

export function getFeedData(amountofRecipes, cb) {
  // Get the recipe object with the correct id
  var feedData = getCollection('recipe');
  var i=1, recipeList=[];

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
  // if recipe name contains search word, append its id
  var text = searchText.toLowerCase().split(" ");
  var j, k, h, match = [];
  for (j=0; j<recipeData.length; j++) {
    var name = recipeData[j].name.toLowerCase().split(" ");
    for (k=0; k<text.length; k++) {
      for (h=0; h<name.length; h++) {
        if (text[k] == name[h]) {
          match.push(recipeData[j]._id);
        }
      }
    }
  }
  // map each recipe id
  match.map((recipe, m) => {
    // k is the index
    match[m] = getRecipeSync(recipe);
  });
  // match = wanted recipe
  emulateServerReturn(match, cb);
}

/**
 * Returns an array of the recipes whose ids match the list of recipe ids.
 */
export function findRecipesFromId(recipeIDs, cb) {
  // will contain the list of recipes
  var recipes = [];
  // map each recipe id
  recipeIDs.map((recipeID, i) => {
    // i is the index
    recipes[i] = getRecipeSync(recipeID);
  });
  emulateServerReturn(recipes, cb);
}
