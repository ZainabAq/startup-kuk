// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.

var express = require('express');
// Creates an Express server.
var app = express();

//importing methods from the database
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = require('./database').writeDocument;
var addDocument = require('./database').addDocument;
var writeCalendar = require('./database').writeCalendar;
var getCollection = require('./database').getCollection;

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

function getCalendarSync(week, day) {
  var calendar = readDocument('calendar', week);
  var meals = [];
  calendar[day].forEach((recipeId) => {
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
  // Get the calendar for the user.
  var calendar = readDocument('calendar',userData.calendar);
  // For now, static date is Monday.
  var meals = [];
  calendar.Monday.forEach((recipeId) => {
    meals.push(getRecipeSync(recipeId));
  })
  return meals;
}

// Get Profile data
app.get('/user/:userid', function(req, res) {
  var userId = req.params.userid;
  // Get the User object with the id "user."
  var userData = readDocument('users', userId);
  // Add upcoming meals
  userData.upcomingMeals = getUpcomingMeals(userId);
  // Return UserData with resolved references.
  res.send(userData);
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
  var userId = req.params.userid;
  var userData = readDocument("users", userId);
  var restrictions = userData.restrictions;
  restrictions = getRestrictionStrings(restrictions);
  res.send(restrictions);
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
  var week = req.params.week;
  var user = req.params.userid;
  var userData = readDocument('users', user);
  var calendar = readDocument('calendar', week);
  userData.Monday = getCalendarSync(week, "Monday");
  userData.Tuesday = getCalendarSync(week, "Tuesday");
  userData.Wednesday = getCalendarSync(week, "Wednesday");
  userData.Thursday = getCalendarSync(week, "Thursday");
  userData.Friday = getCalendarSync(week, "Friday");
  userData.Saturday = getCalendarSync(week, "Saturday");
  userData.Sunday = getCalendarSync(week, "Sunday");
  res.send(userData);
});

//Delete recipe from Calendar
app.delete('/user/:userid/calendar/:week/:day/:meal', function(req, res) {
  var week = req.params.week;
  var userid = req.params.userid;
  var day = req.params.day;
  var meal = req.params.meal;
  var user = parseInt(userid, 10);
  var userData = readDocument('users', userid);
  var calendar = readDocument('calendar', week);
  if (calendar.length > 1) {
  if (user !== -1) {
    calendar[day].splice(meal, 1);
    //writeCalendar('calendar', calendar, week);
    //writeDocument('users', userData);
    console.log(calendar);
    writeCalendar('calendar', calendar, week);
    writeDocument('calendar', calendar);
    res.send(calendar);

  }}
});

/*
* This method replaces "getRecipe" from the old server.
* It gives recipe data from the database given a recipe * id.
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
      console.log("favorites before favoriting: ", user.favorites);
      user.favorites.push(recipeid);
      writeDocument("users", user);
      console.log("favorites after favoriting: ", user.favorites);
      res.send(user);
   }
   else {
      console.log("Authentication failed!");
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
      console.log("favorites before unfavoriting: ", user.favorites)
      var favoriteIndex = user.favorites.indexOf(recipeid);
      if (favoriteIndex !== -1) {
         user.favorites.splice(favoriteIndex, 1);
      }
      writeDocument("users", user);
      console.log("favorites after unfavoriting: ", user.favorites)
      res.send(user);
   }
   else {
      console.log("Authentication failed!");
      res.status(401).end();
   }
});

/**
 * Returns an array of the recipes whose names match the searched keyword.
 */
app.post('/results', function(req, res) {
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
});

/*
* This function checks the user's favorites to see if
* a given recipe already exists in their list of
* favorites. Replacement of checkUserFavorites.
*/

app.get("/recipe/:recipeid/favorites/check/user/:userid", function(req, res) {
   var userid = req.params.userid;
   var recipeid = parseInt(req.params.recipeid, 10);
   var user = readDocument("users", userid);
   var favorites = user.favorites;
   var isRecipeIn = false;
   if (favorites.indexOf(recipeid) !== -1) {
      isRecipeIn = true;
   }
   res.send(isRecipeIn);
});


 /**
 * Gets the favorites data for a particular user.
 */
app.get('/user/:userid/favorites/', function(req, res) {
  // will contain the list of recipes
  var recipes = [];
  var userid = req.params.userid;
  var userData = readDocument('users', userid);
  var recipeIDs = userData.favorites;
  // map each recipe id
  recipeIDs.map((recipeID, i) => {
    // i is the index
    recipes[i] = getRecipeSync(recipeID);
  });
  // Send response.
  res.send(recipes);
});

/**
* Add's a recipe to the user's calendar. Used on the recipe page (when a user
* clicks on the calendar button, this gets called)
*/
app.put("/recipe/:recipeid/user/:userid/calendar/:dayid", function(req, res) {
   var userid = parseInt(req.params.userid, 10);
   var recipeid = parseInt(req.params.recipeid, 10);
   var day = req.params.dayid;
   var user = readDocument("users", userid);
   var calendar = readDocument("calendar", 3);
   console.log("calendar before:", calendar[day]);
   if (calendar[day][3]) {
      calendar[day][3] = recipeid;
   } else {
      calendar[day].push(recipeid);
   }
   // writeDocument("users", user)
   writeCalendar("calendar", calendar, 3);
   console.log("calendar after:", calendar[day]);
   res.send(user);
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


/*
var user = readDocument(users, userid);
var calId= user.calender
var cal  = readDocument(cal, calid);
*/
