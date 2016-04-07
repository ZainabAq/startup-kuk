import {readDocument, writeDocument, getCollection} from './database.js';

//   XHR REQUEST MAIN CODE (from Workshop 6)
var token = 'eyJpZCI6MX0='; // <-- Put your base64'd JSON token here
/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /*global KukError*/

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      KukError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    KukError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    KukError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}


export function removeRecipefromCalendar(userid, week, day, meal, cb) {
  sendXHR('DELETE', '/user/' + userid + '/calendar/' + week + "/" + day + "/" + meal, undefined, (xhr) => {
        // Call the callback with the data.
        cb(JSON.parse(xhr.responseText));
      });
}


export function getProfileCalendarData(userid, week, cb) {
  sendXHR('GET', '/user/' + userid + '/calendar/' + week, undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * @param user The id of the user
 * @param cb The callback function to be called at the end
 * Calls cb on a UserData object that is resolved except for the restriction references.
 */
export function getProfileData(user, cb) {
  sendXHR('GET', '/user/' + user, undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}


//need functions to addFavorites, addRating, addMealstoCalendar, getRecipeInformation
//modifyRestrictions (for the profile)

export function getRecipe(recipeId, cb) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", "/recipe/" + recipeId);
   xhr.addEventListener("load", function(){
      cb(JSON.parse(xhr.responseText));
   });
   xhr.send();
}

/**
 * @param user The id of the user
 * @param cb The callback function to be called at the end
 */
export function getUserRestrictions(user, cb) {
  sendXHR('GET', '/user/' + user, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
}

/**
 * @param checkbox The DOM object triggering this call
 * @param userId The id of the user whose restrictions are to be modified
 * @param cb The callback function to be called at the end
 * Calls cb on an object holding the user's modified restrictions array (unresolved)
 * and the checkbox.
 */
export function addUserRestriction(restrictionId, userId, cb) {
  sendXHR('PUT', '/user/' + userId + '/restriction/' + restrictionId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * @param restrictionId The id of the restriction to be removed
 * @param userId The id of the user whose restrictions are to be modified
 * @param cb The callback function to be called at the end
 * Calls cb on an object holding the user's modified restrictions array (unresolved)
 * and the checkbox.
 */
export function removeUserRestriction(restrictionId, userId, cb) {
  sendXHR('DELETE', '/user/' + userId + '/restriction/' + restrictionId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
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
  var xhr = new XMLHttpRequest();
  //console.log(searchText)
  xhr.open('POST', '/results');
  xhr.addEventListener('load', function() {
    cb(JSON.parse(xhr.responseText));
  });
  xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  xhr.send(searchText);
}

/**
 * Returns an array of the recipes whose ids match the list of recipe ids.
 */
export function findRecipesFromId(userId,recipeIDs, cb) {
  sendXHR('GET', '/user/' + userId + '/favorites/', undefined, (xhr) => {
        // Call the callback with the data.
        cb(JSON.parse(xhr.responseText));
      });
}

/**
* The function that adds recipes to the user's list of favorites
*/
export function addFavorite(recipeId, userId, cb) {
   console.log("in add favorite");
   sendXHR("PUT", "/recipe/" + recipeId + "/favorites/user/" + userId, undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
   });
   console.log("request sent")
   // var xhr = new XMLHttpRequest();
   // xhr.open("PUT", "/recipe/" + recipeId + "/favorites/user/" + userId);
   // xhr.addEventListener("load", function(){
   //    cb(JSON.parse(xhr.responseText));
   // });
   // xhr.send();

}

/**
* The function that removes recipes from the user's list of favorites
*/
export function removeFavorite (recipeId, userId, cb) {
   sendXHR("DELETE", "/recipe/" + recipeId + "/favorites/user/" + userId, undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
   });
   // var xhr = new XMLHttpRequest();
   // xhr.open("DELETE", "/recipe/" + recipeId + "/favorites/user/" + userId);
   // xhr.addEventListener("load", function(){
   //    cb(JSON.parse(xhr.responseText));
   // });
   // xhr.send();
}

/**
 * @param user The id of the user
 * @param cb The callback function to be called at the end
 */
export function checkUserFavorites(recipeId, userId, cb) {
   sendXHR("GET", "/recipe/" + recipeId + "/favorites/check/user/" + userId, undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
   });
//  var xhr = new XMLHttpRequest();
// xhr.open("GET", "/recipe/" + recipeId + "/favorites/check/user/" + userId);
// xhr.addEventListener("load", function(){
//     cb(JSON.parse(xhr.responseText));
// });
// xhr.send();
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
   var xhr = new XMLHttpRequest();
   xhr.open("PUT", "/recipe/" +recipeId+ "/user/" +userId+ "/calendar/" + day)
   xhr.addEventListener("load", function() {
      cb(JSON.parse(xhr.responseText));
   })
   xhr.send();
   // var user = readDocument("users", userId);
   // var calendar = readDocument("calendar", 2);
   // if (calendar[day][3]) {
   //    calendar[day][3] = recipeId;
   // } else {
   //    calendar[day].push(recipeId);
   // }
   // writeDocument('users', user);
   // emulateServerReturn(user, cb);
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
