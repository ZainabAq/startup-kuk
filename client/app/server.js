import {readDocument, writeDocument, getCollection, writeCalendar} from './database.js';

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

// function getCalendarSync(week, day) {
//   var calendar = readDocument('calendar', week);
//   // Resolve meals
//   Object.keys(calendar).map((day) => {
//     calendar[day].map((meal, i) => {
//       // i is the meal's index
//       calendar[day][i] = getRecipeSync(meal);
//     })
//   })
//   return calendar;
// }

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

function getCalendarData(userId, week, day) {
  //var userData = readDocument('users', userId);
  var calendar = readDocument('calendar', week);
  var meals = [];
  calendar[day].forEach((recipeId) => {
    meals.push(getRecipeSync(recipeId));
  })
  return meals;

}

function removeRecipefromCalendarhere(id, week, day, i) {
  var calendar = readDocument('calendar', week);
  if (id !== -1) {
    calendar[day].splice(i, 1);
    writeCalendar('calendar', calendar, week);
    return calendar;
  }
}

export function removeRecipefromCalendar(id, week, day, i, cb) {
  var calendar = removeRecipefromCalendarhere(id, week, day, i, cb);
  emulateServerReturn(calendar, cb);
}

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
  // Add upcoming meals
  userData.upcomingMeals = getUpcomingMeals(user);
  // Return UserData with resolved references.
  emulateServerReturn(userData, cb);
}

export function getProfileCalendarData(user, week, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Add upcoming calendar
  userData.Monday = getCalendarData(user, week, "Monday");
  userData.Tuesday = getCalendarData(user, week, "Tuesday");
  userData.Wednesday = getCalendarData(user, week, "Wednesday");
  userData.Thursday = getCalendarData(user, week, "Thursday");
  userData.Friday = getCalendarData(user, week, "Friday");
  userData.Saturday = getCalendarData(user, week, "Saturday");
  userData.Sunday = getCalendarData(user, week, "Sunday");
  // Return UserData with resolved references.
  emulateServerReturn(userData, cb);
}

//need functions to addFavorites, addRating, addMealstoCalendar, getRecipeInformation
//modifyRestrictions (for the profile)

//trying things out here to see if sending server requests is going to work
//doesn't work because it doesn't like the database
//which is confusing b/c it was perfectly fine to return a JSON of the right information
//when /recipe/:id was there (but not /#/recipe/:recipeid)
export function getRecipe(recipeId, cb) {
   //get the recipe object with the correct id
   var recipeData = readDocument('recipe', recipeId);
   emulateServerReturn(recipeData, cb);
   // var xhr = new XMLHttpRequest();
   // xhr.open("GET", "/recipe/:recipeid");
   // xhr.addEventListener("load", function(){
   //    cb(JSON.parse(xhr.responseText));
   // });
   // xhr.send();
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

/**
 * @param array of restrictions to not be included
 * @param cb, callback function
 * gets the proper recipes to popualate the feed
 */
export function getFeedData(restrictions, cb) {
  // get the recipe collection & initialize feedData
  var recipes = getCollection('recipe');
  var feedData = [];
  // if no filter has been applied yet, get all the recipes
  if (restrictions.length == 0) {
    for (var i in recipes) {
      if (recipes.hasOwnProperty(i)) {
        feedData.push(recipes[i]);
      }
    }
  } else {
    // get the set of recipes that have restrictions
    var recipeSet = new Set();
    for (var id in restrictions) {
      var badRecipes = readDocument('restrictions', restrictions[id]).recipes;
      for (var recipeId in badRecipes) {
        recipeSet.add(badRecipes[recipeId]);
      }
    }
    // get recipes that don't match the set of restricted recipes
    for(var j in recipes) {
      if (!recipeSet.has(recipes[j]._id)) {
        feedData.push(recipes[j]);
      }
    }
  }
  emulateServerReturn(feedData, cb);
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

/**
* The function that adds recipes to the user's list of favorites
*/
export function addFavorite(recipeId, userId, cb) {
   // console.log("IN THE ADD FAVORITES FUNCTION IN SERVER");
   //getting both the user and the recipe from the database
   // var recipe = readDocument("recipes", recipeId);
   var user = readDocument("users", userId);
   // console.log("favorites before adding:", user.favorites);
   user.favorites.push(recipeId);
   writeDocument('users', user);
   // console.log("favorites after adding:", user.favorites);
   emulateServerReturn(user, cb);
}

/**
* The function that removes recipes from the user's list of favorites
*/
export function removeFavorite (recipeId, userId, cb) {
   var user = readDocument("users", userId);
   // console.log("favorites before:", user.favorites);
   //now need to remove the favorite from the user's list of favorites
   var favoriteIndex = user.favorites.indexOf(recipeId);
   if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);
      writeDocument("users", user);
      // console.log("favorites after:", user.favorites);
   }
   emulateServerReturn(user, cb);
}

// var userIndex = feedItem.comments[index].likeCounter.indexOf(userId);
// // -1 means the user is *not* in the likeCounter, so we can simply avoid updating
// // anything if that is the case: the user already doesn't like the item.
// if (userIndex !== -1) {
//   // 'splice' removes items from an array. This removes 1 element starting from userIndex.
//   feedItem.comments[index].likeCounter.splice(userIndex, 1);
//   writeDocument('feedItems', feedItem);
// }
// // Return a resolved version of the commentLikeCounter
// emulateServerReturn(getFeedItemSync(feedItemId), cb);

// /**
//  * @param user The id of the user
//  * @param cb The callback function to be called at the end
//  */
// export function getUserFavorites(user, cb) {
//   var userData = readDocument("users", user);
//   var favorites = userData.favorites;
//   // favorites = getRestrictionStrings(favorites);
//   emulateServerReturn(favorites, cb);
// }


/**
 * @param user The id of the user
 * @param cb The callback function to be called at the end
 */
export function checkUserFavorites(recipeId, userId, cb) {
  var user = readDocument("users", userId);
  var favorites = user.favorites;
  console.log("favorites is:", favorites)
  var isRecipeIn = false;
  if (favorites.includes(recipeId)) {
     isRecipeIn = true;
 }
 console.log("checkUserFavorites:", isRecipeIn);
  //assuming that favorites is an array here
  // favorites = getRestrictionStrings(favorites);
  emulateServerReturn(isRecipeIn, cb);
}

/**
 * @param checkbox The DOM object triggering this call
 * @param cb The callback function to be called at the end
 * Returns recipes that don't match restrictionId
 */
export function getRestriction(checkbox, cb) {
  var restrictionId = checkbox.value;
   //get the recipe object with the correct id
  //  var dietData = readDocument('restrictions', restrictionId);
   var result = {"restrictions":restrictionId, "target":checkbox};
   emulateServerReturn(result, cb);
}

/**
* Adding a recipe to the user's calendar when given the user's id, the recipe's id,
* and the day you want to add the recipe to
*/
export function addRecipeToCalendar(recipeId, userId, day, cb) {
   console.log("in the addRecipeToCalendar server method");
   var user = readDocument("users", userId);
   var calendar = readDocument("calendar", 2);
   console.log("calender before is: ", calendar[day]);
   if (calendar[day][3]) {
      calendar[day][3] = recipeId;
   } else {
      calendar[day].push(recipeId);
   }
   console.log("calendar after is: ", calendar[day]);
   writeDocument('users', user);
   emulateServerReturn(user, cb);
}

/**
  * Gets the recipes that have the ingredients the user puts in
  * @param ingredientsList is the list of ingredients entered in instamode
  */
export function findRecipeByIngredients(ingredientsList, cb) {
    var recipes = getCollection('recipe');
    var i, recipeData = [];
    for (i in recipes) {
      if (recipes.hasOwnProperty(i)) {
        recipeData.push(recipes[i]);
      }
    }
    // will store the list of recipes that match
    var matchedIngredientRecipe = [];

    for (var z=0; z<recipeData.length; z++) {
      var ingredients = recipeData[z].ingredients;
      // ingredients is the list for each recipe's ingredients
      // deciding which list to loop over, depends on which is longer
      // var longerList;
      // console.log(ingredients.length);
      // if (ingredientsList.length >= ingredients.length) {
      //   longerList = ingredientsList;
      // } else {
      //   longerList = ingredients;
      // }
      for (var y=0; y<ingredients.length; y++) {
        var splitIngredients = ingredients[y].split(' ');
        for (var x=0; x<ingredientsList.length; x++) {
          if (splitIngredients.indexOf(ingredientsList[x]) > -1 && matchedIngredientRecipe.indexOf(recipeData[z]) === -1) {
            matchedIngredientRecipe.push(recipeData[z]);
            break;
          }
        }
      }
    }
    // console.log(matchedIngredientRecipe);
    emulateServerReturn(matchedIngredientRecipe, cb);
}

//   XHR REQUEST MAIN CODE (from Workshop 6)
