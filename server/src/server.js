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
  var user = req.params.userid;
  var meal = req.params.meal;
  var calendar = readDocument('calendar', week);
  if (user !== -1) {
    calendar[day].splice(meal, 1);
    writeCalendar('calendar', calendar, week);
    res.send(calendar);
  }
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
   console.log("in the favoriting method");
   var userid = req.params.userid;
   var user = readDocument("users", userid);
   var recipeid = req.params.recipeid;
   user.favorites.push(recipeid);
   writeDocument("users", user);
   res.send(user);
});

/*
* This function removes a recipe from the user's list
* of favorites. Replacement of removeFavorite.
*/
app.delete("/recipe/:recipeid/favorites/user/:userid", function(req, res) {
   console.log("in the unfavoriting method");
   var userid = req.params.userid;
   var user = readDocument("users", userid);
   var recipeid = req.params.recipeid;
   var favoriteIndex = user.favorites.indexOf(recipeid);
   if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);
   }
   writeDocument("users", user);
   res.send(user);
});

app.post('/results', function(req, res) {
  var searchText = req.body;
  console.log("searchText")
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
  console.log(match)
  res.send(match);
})

/*
* This function checks the user's favorites to see if
* a given recipe already exists in their list of
* favorites.
*/
app.put("/recipe/:recipeid/favorites/check/user/:userid", function(req, res) {
   console.log("in the server side checkUserFavorites");
   var userid = req.params.userid;
   var recipeid = req.params.recipeid;
   var user = readDocument("users", userid);
   var favorites = user.favorites;
   var isRecipeIn = false;
   if (favorites.includes(recipeid)) {
      isRecipeIn = true;
   }
   res.send(isRecipeIn);
});

// Starts the server on port 3000
app.listen(3000, function () {
  console.log('Kuk server listening on port 3000!');
});
