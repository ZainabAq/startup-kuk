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
