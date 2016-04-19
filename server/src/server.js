// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.

var express = require('express');
// Creates an Express server.
var app = express();
var bodyParser = require('body-parser');
// importing the reset database file so the reset db button will work again
var ResetDatabase = require('./resetdatabase');
// importing mongodb
var mongo_express = require('mongo-express/lib/middleware');
// import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
app.use('/mongo_express', mongo_express(mongo_express_config));
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/kuk';

// HTTP REQUEST FUNCTIONS GO HERE
MongoClient.connect(url, function(err, db) {
   app.use(bodyParser.text());
   app.use(bodyParser.json());
   app.use(express.static('../client/build'));

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
         if (typeof id === 'string') {
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
    * Helper function: Sends back HTTP response with error code 500 due to
    * a database error.
    */
   function sendDatabaseError(res, err) {
     res.status(500).send("A database error occurred: " + err);
   }

   //our recipe id wasn't being sent correctly, so we made a method
   //to hexify the id to a 24 character string
   function hexify(idNum) {
      var length = idNum.toString().length;
      var numZero = 24-length;
      var newId = "0".repeat(numZero) + idNum.toString();
      newId = new ObjectID (newId);
      return newId;
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
   function getRecipe(recipeId, callback) {
      db.collection("recipe").findOne({_id:recipeId}, function(err, recipe) {
         if (err) {
            return callback(err, null);
         } else if (recipe == null) {
            return callback(null, null);
         } else {
            return callback(null, recipe);
         }
      });
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
   * @param userId The ObjectID of the user whose calendar we are requesting.
   * @returns A 4-element array of the next 4 meals.
   */
   function getUpcomingMeals(userId, callback) {
     db.collection('users').findOne({
       _id: userId
     }, function(err, userData) {
       if (err) {
         return callback(err);
       } else if (userData === null) {
         return callback(null, null);
       }

       db.collection('calendars').findOne({
         _id: userData.calendarId
       }, function(err, calendarData) {
         if (err) {
           return callback(err);
         } else if (calendarData === null) {
           return callback(null, null);
         }

         // Resolve each recipe in parallel,
         // and push them into this array.
         var resolvedContents = [];
         var errored = false;

         // Callback function for each call to 'getRecipe.'
         function processRecipe(err, recipeItem) {
           if (errored) {
             // A previous callback already called callback() with
             // an error.
             return;
           } else if (err) {
             // Pass an error to the callback, and flip the error boolean.
             errored = true;
             callback(err);
           } else {
             // Success!
             resolvedContents.push(recipeItem);
             if (resolvedContents.length === calendarData[1].Monday.length) {
               // I am the final recipe item; all others are resolved.
               // Pass the resolved recipes back to the callback.
               callback(null, resolvedContents);
             }
           }
         }

         // Process all of the day's recipes in parallel.
         for (var i = 0; i < calendarData[1].Monday.length; i++) {
           getRecipe(calendarData[1].Monday[i], processRecipe);
         }

         // Special case: Calendar for Monday is empty.
         if (calendarData[1].Monday.length === 0) {
           callback(null, []);
         }
       })
     })
   }

   // Get Profile data
   app.get('/user/:userid', function(req, res) {
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userId = req.params.userid;
      if (fromUser === userId) {
        var user = new ObjectID(userId);
        // Get the User object with the id "user."
        db.collection('users').findOne({
          _id: user
        }, function(err, userData) {
          if (err) {
            // Database Error
            res.status(500).send("Database Error: " + err);
          } else if (userData === null) {
            // User not found.
            res.status(400).send("Could not look up data for user " + userId);
          } else {
            getUpcomingMeals(user, function(err, meals) {
              if (err) {
                // Database Error
                res.status(500).send("Database Error: " + err);
              } else if (meals === null) {
                // Meals not found.
                res.status(400).send("Could not look up meal data for user " + userId);
              } else {
                // Add upcoming meals
                userData.upcomingMeals = meals;
                // Send data.
                res.send(userData);
              }
            });
          }
        });
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
      var recipeid = hexify(req.params.recipeid);
      getRecipe(recipeid, function(err, recipe) {
         if (err) {
            res.status(500).send("A database error occured" + err);
         } else {
            res.send(recipe);
         }
      });
   });


   /*
   * This function adds a recipe to a user's list of
   * favorites. Replacement of addFavorite.
   */
   //PUT a recipe into the user's list of favorites
   app.put('/recipe/:recipeid/favorites/user/:userid', function(req, res) {
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      var userid = req.params.userid;
      var recipeid = new ObjectID(req.params.recipeid);
      //not sure if this should be wrapped in an object
      if (fromUser === userid) {

         db.collection("users").updateOne({_id:userid},
            {
               $push: {
                  favorites: new ObjectID(recipeid)
               }
            }, function(err) {
               if (err) {
                  res.status(500).send("Database error: " + err);
               }
               //get the user object now that we've updated it
               db.collection("users").findOne( {_id:recipeid}, function(err, user) {
                  if (err) {
                     res.status(500).send("Database error: "+err);
                  }
                  res.send(user);
               });
            }
         );

         //MUST CHANGE EVERYTHING IN HERE
         // var user = readDocument("users", userid);
         // var recipeid = parseInt(req.params.recipeid, 10);
         // // console.log("favorites before favoriting: ", user.favorites);
         // user.favorites.push(recipeid);
         // writeDocument("users", user);
         // // console.log("favorites after favoriting: ", user.favorites);
         // res.send(user);
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
      var userid = req.params.userid;
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
        var searchText = req.body.trim().toLowerCase();
        // get Recipe collection
        db.collection('recipe').find().toArray(function(err, recipes) {
          if (err) {
            sendDatabaseError(res, err);
          }
          // if recipe name contains search word, append its id
          var text = searchText.split(" ");
          var match = [];
          for (var j=0; j<recipes.length; j++) {
             var name = recipes[j].name.split(" ");
             for (var k=0; k<text.length; k++) {
                for (var h=0; h<name.length; h++) {
                   if (text[k] == name[h]) {
                      match.push(recipes[j]._id);
                   }
                }
             }
          }
          // Resolve all of the results items.
          var resolvedItems = [];
          var errored = false;
          function onResolve(err, resultsItem) {
            if (errored) {
              return;
            } else if (err) {
              errored = true;
              sendDatabaseError(res, err);
            } else {
              resolvedItems.push(resultsItem);
              if (resolvedItems.length === match.length) {
                // Send resolved items to the client!
                res.send(resolvedItems);
              }
            }
          }
          // Resolve all of the matched feed items in parallel.
          for (var i=0; i<recipes.length; i++) {
            getRecipe(match[i], onResolve);
          }
        })
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
      var userid = req.params.userid;
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
      if (typeof(req.body) === 'string') {
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
      } else {
         // 400: Bad Request.
         res.status(400).end();
      }
   });

   /**
   * Posts the results from searching with instamode (when a user
   * clicks on the Find a recipe button, it is called)
   */
   app.post('/instaresults/ingredientsONLY', function(req, res) {
      if (typeof(req.body) === 'string') {
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
         var ingredientMatch = [];
         for (var z=0; z<recipeData.length; z++) {
            var ingredients = recipeData[z].ingredients;
            for (var y=0; y<ingredients.length; y++) {
               // split ingredients = ingredients from recipe
               var splitIngredients = ingredients[y].split(' ');
               for (var x=0; x<ingredientsList.length; x++) {
                  // ingrdientList[x] = each ingredient in the list from user
                  if (splitIngredients.indexOf(ingredientsList[x]) > -1 && matchedIngredientRecipe.indexOf(recipeData[z]) === -1) {
                     ingredientMatch.push('yes');
                  } else {
                     ingredientMatch.push('no');
                  }
               }
            }
            // console.log(ingredientMatch);
            // console.log(ingredientMatch.indexOf('no') > -1);
            if (ingredientMatch.indexOf('no') > -1) {
               // do nothing
            } else {
               matchedIngredientRecipe.push(recipeData[z]);
            }
         }
         res.send(matchedIngredientRecipe);
      } else {
         // 400: Bad Request.
         res.status(400).end();
      }
   });


   // Reset the database.
   app.post('/resetdb', function(req, res) {
     console.log("Resetting database...");
     ResetDatabase(db, function() {
       res.send();
     });
   });

   // Starts the server on port 3000
   app.listen(3000, function () {
      console.log('Kuk server listening on port 3000!');
   });

});
