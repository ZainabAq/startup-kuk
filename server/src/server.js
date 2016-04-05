// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.

var express = require('express');
// Creates an Express server.
var app = express();

//importing methods from the database
var database = require('./database');
var readDocument = database.readDocument;

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

function getCalendarSync(userId, week, day) {
  var calendar = readDocument('calendar', week);
  var meals = [];
  calendar[day].forEach((recipeId) => {
    meals.push(getRecipeSync(recipeId));
  })
  return meals;

}

// Get ProfileCalendarData
app.get('calendar/:week', function(req, res) {
  var week = req.params.week;
  var user = req.params.user;
  var userData = readDocument('users', user);
  userData.Monday = getCalendarSync(user, week, "Monday");
  userData.Tuesday = getCalendarSync(user, week, "Tuesday");
  userData.Wednesday = getCalendarSync(user, week, "Wednesday");
  userData.Thursday = getCalendarSync(user, week, "Thursday");
  userData.Friday = getCalendarSync(user, week, "Friday");
  userData.Saturday = getCalendarSync(user, week, "Saturday");
  userData.Sunday = getCalendarSync(user, week, "Sunday");
  res.send();
});

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
