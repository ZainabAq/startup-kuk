// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.

var express = require('express');
// Creates an Express server.
var app = express();

//importing methods from the database
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
// var writeCalendar = database.writeCalendar;
var getCollection = database.getCollection;

app.use(express.static('../client/build'));

var bodyParser = require('body-parser');

// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());

// HTTP REQUEST FUNCTIONS GO HERE

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

/**
 * Get the feed data for a particular user.
 */
function getFeedData(restrictions) {
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
    // get the unique set of recipes that have restrictions
    var recipeSet = [];
    for (var id in restrictions) {
      var badRecipes = readDocument('restrictions', restrictions[id]).recipes;
      for (var recipeId in badRecipes) {
        if (recipeSet.indexOf(badRecipes[recipeId]) === -1) {
          recipeSet.push(badRecipes[recipeId]);
        }
      }
    }
    // get recipes that don't match the set of restricted recipes
    for(var j in recipes) {
      if (recipeSet.indexOf(recipes[j]._id) === -1) {
        feedData.push(recipes[j]);
      }
    }
  }
  return feedData;
}

/**
 * Get appropriate feed data to populate the browse page
 */
app.put('/feed/', function(req, res) {
  if (req.body.constructor !== Array) {
      // 400: Bad request.
      res.status(400).end();
      // return;
  }
  var restrictions = req.body;
  // Send response.
  res.send(getFeedData(restrictions));
});

/*
* Given a recipe ID, returns a recipe object with references resolved.
* Internal to the server, since it's synchronous.
* Comes directly from the old server.js.
*/
function getRecipeSync(recipeId) {
   var recipe = readDocument('recipe', recipeId);
   return recipe;
}

/**Zainab Calendar methods*/

function getCalendarSync(userData, week, day) {
  var calId = userData.calendarId;
  var calendar = readDocument('calendars', calId);
  var weekno = parseInt(week, 10);
  var weekCal = calendar[weekno];
  var meals = [];
  weekCal[day].forEach((recipeId) => {
    meals.push(getRecipeSync(recipeId));
  })
  return meals;
}

/**
 * Gets next 4 meals for a particular user.
 * @param userId The ID of the user whose calendar we are requesting.
 * @returns A 4-element array of the next 4 meals.
 */
function getUpcomingMeals(userId) {
  // Get the User object with the id "userId".
  var userData = readDocument('users', userId);
  var calId = userData.calendarId;
  var calendar = readDocument('calendars', calId);
  // Get the calendar for the user.
  var week = calendar[1];
  // For now, static date is Monday.
  var meals = [];
  week.Monday.forEach((recipeId) => {
    meals.push(getRecipeSync(recipeId));
  })
  return meals;
}

// Get Profile data
app.get('/user/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    // Get the User object with the id "user."
    var userData = readDocument('users', userId);
    // Add upcoming meals
    userData.upcomingMeals = getUpcomingMeals(userId);
    // Return UserData with resolved references.
    res.send(userData);
  } else {
    res.status(401).end();
  }
});

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

// GET User Restriction Tags
app.get('/user/:userid/restrictions', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    var userData = readDocument("users", userId);
    var restrictions = userData.restrictions;
    restrictions = getRestrictionStrings(restrictions);
    res.send(restrictions);
  } else {
    res.status(401).end();
  }
});

// PUT A restriction id in a user's data.
app.put('/user/:userid/restriction/:restrictionid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var restrictionId = parseInt(req.params.restrictionid, 10);
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    var userData = readDocument("users", userId);
    // Add to user restrictions if not already present.
    if (userData.restrictions.indexOf(restrictionId) === -1) {
      userData.restrictions.push(restrictionId);
      writeDocument('users', userData);
    }
    // Return an updated version of the restrictions list
    res.send(userData.restrictions);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

// DELETE a restriction id from a user's data.
app.delete('/user/:userid/restriction/:restrictionid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var restrictionId = parseInt(req.params.restrictionid, 10);
  var userId = parseInt(req.params.userid, 10);
  if (fromUser === userId) {
    var userData = readDocument('users', userId);
    var restrictionIndex = userData.restrictions.indexOf(restrictionId);
    // Remove from restriction array if present
    if (restrictionIndex !== -1) {
      userData.restrictions.splice(restrictionIndex, 1);
      writeDocument('users', userData);
    }
    // Return an updated version of the restrictions array
    // Note that this request succeeds even if the user already unliked the request!
    res.send(userData.restrictions);
  } else {
    // 401: Unauthorized
    res.status(401).end();
  }
})

// Get ProfileCalendarData
app.get('/user/:userid/calendar/:week', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var week = req.params.week;
  var user = parseInt(req.params.userid, 10);
  if (fromUser === user) {
      var userData = readDocument('users', user);
      userData.Monday = getCalendarSync(userData, week, "Monday");
      userData.Tuesday = getCalendarSync(userData, week, "Tuesday");
      userData.Wednesday = getCalendarSync(userData, week, "Wednesday");
      userData.Thursday = getCalendarSync(userData, week, "Thursday");
      userData.Friday = getCalendarSync(userData, week, "Friday");
      userData.Saturday = getCalendarSync(userData, week, "Saturday");
      userData.Sunday = getCalendarSync(userData, week, "Sunday");
      res.send(userData);
}
else {
  res.status(401).end();
}
});

//Delete recipe from Calendar
app.delete('/user/:userid/calendar/:week/:day/:meal', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var week = req.params.week;
  var userid = parseInt(req.params.userid, 10);
  var day = req.params.day;
  var meal = parseInt(req.params.meal, 10);
  if (fromUser === userid) {
        var userData = readDocument('users', userid);
        var calId = userData.calendarId;
        var calendar = readDocument('calendars', calId);
        var weekno = parseInt(week, 10);
        var weekCal = calendar[weekno];
        if (meal !== -1) {
          weekCal[day].splice(meal, 1);
          writeDocument('calendars', calendar);
          res.send(calendar);
        }
      }
  else {
    res.status(401).end();
  }
});

/*
* This method replaces "getRecipe" from the old server.
* It gives recipe data from the database given a recipe id.
*/
app.get('/recipe/:recipeid/', function(req, res) {
   //get the recipe id out of the url
   var recipeid = req.params.recipeid;
   //send the response
   res.send(getRecipeSync(recipeid));
});


/*
* This function adds a recipe to a user's list of
* favorites. Replacement of addFavorite.
*/
app.put('/recipe/:recipeid/favorites/user/:userid', function(req, res) {
   var fromUser = getUserIdFromToken(req.get('Authorization'));
   var userid = parseInt(req.params.userid, 10);
   if (fromUser === userid) {
      var user = readDocument("users", userid);
      var recipeid = parseInt(req.params.recipeid, 10);
      // console.log("favorites before favoriting: ", user.favorites);
      user.favorites.push(recipeid);
      writeDocument("users", user);
      // console.log("favorites after favoriting: ", user.favorites);
      res.send(user);
   }
   else {
      // console.log("Authentication failed!");
      res.status(401).end();
   }
});

/*
* This function removes a recipe from the user's list
* of favorites. Replacement of removeFavorite.
*/
app.delete("/recipe/:recipeid/favorites/user/:userid", function(req, res) {
   var fromUser = getUserIdFromToken(req.get('Authorization'));
   var userid = parseInt(req.params.userid, 10);
   if (fromUser === userid) {
      var user = readDocument("users", userid);
      var recipeid = parseInt(req.params.recipeid, 10);
      // console.log("favorites before unfavoriting: ", user.favorites)
      var favoriteIndex = user.favorites.indexOf(recipeid);
      if (favoriteIndex !== -1) {
         user.favorites.splice(favoriteIndex, 1);
      }
      writeDocument("users", user);
      // console.log("favorites after unfavoriting: ", user.favorites)
      res.send(user);
   }
   else {
      // console.log("Authentication failed!");
      res.status(401).end();
   }
});

/**
 * Returns an array of the recipes whose names match the searched keyword.
 */
app.post('/results', function(req, res) {
  if (typeof(req.body) === 'string') {
  var searchText = req.body;
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
  res.send(match);
  } else {
     // 400: Bad Request.
   res.status(400).end();
 }
});

/*
* This function checks the user's favorites to see if
* a given recipe already exists in their list of
* favorites. Replacement of checkUserFavorites.
*/

app.get("/recipe/:recipeid/favorites/check/user/:userid", function(req, res) {
   var fromUser = getUserIdFromToken(req.get('Authorization'));
   var userid = parseInt(req.params.userid, 10);
   if (userid === fromUser) {
      var recipeid = parseInt(req.params.recipeid, 10);
      var user = readDocument("users", userid);
      var favorites = user.favorites;
      var isRecipeIn = false;
      if (favorites.indexOf(recipeid) !== -1) {
         isRecipeIn = true;
      }
      res.send(isRecipeIn);
   } else {
      // console.log("Authentication failed!");
      res.status(401).end();
   }
});

 /**
 * Gets the favorites data for a particular user.
 */
app.get('/user/:userid/favorites/', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userid = parseInt(req.params.userid, 10);
  if (userid === fromUser) {
    // will contain the list of recipes
    var recipes = [];
    var userData = readDocument('users', userid);
    var recipeIDs = userData.favorites;
    // map each recipe id
    recipeIDs.map((recipeID, i) => {
      // i is the index
      recipes[i] = getRecipeSync(recipeID);
    });
    // Send response.
    res.send(recipes);
  } else {
   //   console.log("Authentication failed!");
     res.status(401).end();
  }
});

/**
* Add's a recipe to the user's calendar. Used on the recipe page (when a user
* clicks on the calendar button, this gets called)
*/
//need to resolve this - right now it's hardcoding both the meal and the week
app.put("/recipe/:recipeid/user/:userid/calendar/:dayid", function(req, res) {
   var fromUser = getUserIdFromToken(req.get('Authorization'));
   var userid = parseInt(req.params.userid, 10);
   if (userid === fromUser) {
      var recipeid = parseInt(req.params.recipeid, 10);
      var day = req.params.dayid;
      var user = readDocument("users", userid);
      var calendar = readDocument("calendars", user.calendarId);
      // var week = calendar[2];
      var weekno = 2;
      var weekCal = calendar[weekno];
      // console.log(weekCal[day]);
      if (weekCal[day][3]) {
         weekCal[day][3] = recipeid;
      } else {
         weekCal[day][3];
      }
      // console.log(weekCal[day]);
      writeDocument("users", user);
      writeDocument("calendars", calendar);
      res.send(user);
   } else {
      res.status(401).end();
   }
});

/**
* Posts the results from searching with instamode (when a user
* clicks on the Find a recipe button, it is called)
*/
app.post('/instaresults', function(req, res) {
  var ingredientsList = req.body.split(',');
  // console.log(ingredientsList);
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
      // console.log(splitIngredients);
      for (var x=0; x<ingredientsList.length; x++) {
        // console.log(ingredientsList[x]);
        if (splitIngredients.indexOf(ingredientsList[x]) > -1 && matchedIngredientRecipe.indexOf(recipeData[z]) === -1) {
          matchedIngredientRecipe.push(recipeData[z]);
          break;
        }
      }
    }
  }
  res.send(matchedIngredientRecipe);
});

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

// Starts the server on port 3000
app.listen(3000, function () {
  console.log('Kuk server listening on port 3000!');
});
