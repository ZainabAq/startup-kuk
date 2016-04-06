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

app.use(express.static('../client/build'));

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
app.get('/user/:userid/calendar/:week/', function(req, res) {
  var week = req.params.week;
  var user = req.params.userid;
  var userData = readDocument('users', user);
  //var calendar = readDocument('calendar', week);
  userData.Monday = getCalendarSync(week, "Monday");
  userData.Tuesday = getCalendarSync(week, "Tuesday");
  userData.Wednesday = getCalendarSync(week, "Wednesday");
  userData.Thursday = getCalendarSync(week, "Thursday");
  userData.Friday = getCalendarSync(week, "Friday");
  userData.Saturday = getCalendarSync(week, "Saturday");
  userData.Sunday = getCalendarSync(week, "Sunday");
  //writeDocument('users', userData);
  res.send(userData);
});

// //Delete recipe from Calendar
// app.delete('/user/:userid/calendar/:week/', function(req, res) {
//   var week = req.params.week;
//   var userid = req.params.userid;
//   var day = req.params.day;
//   var meal = req.params.meal;
//   var userData = readDocument('users', userid);
//   var calendar = readDocument('calendar', week);
//   if (calendar.length > 1) {
//   if (userid !== -1) {
//     calendar[day].splice(meal, 1);
//     //writeCalendar('calendar', calendar, week);
//     writeDocument('users', userData);
//     res.send(userData);
//
//   }}
// });

app.get('/recipe/:recipeid/', function(req, res) {
   //get the recipe id out of the url
   var recipeid = req.params.recipeid;
   //send the response
   res.send(getRecipeSync(recipeid));
});

app.put('/recipe/:recipeid/favorite/', function(req, res) {

});



// Starts the server on port 3000
app.listen(3000, function () {
  console.log('Kuk server listening on port 3000!');
});
