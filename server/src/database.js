// Your startup's initial mock objects go here
var initialData = {
   "users": {
     "1": {
       "_id": 1,
       "firstName": "John",
       "lastName": "Doe",
       "restrictions": ["1","4"],
       "email": "jdoe@gmail.com",
       "favorites": [2,3,5,1,4],
       "calendar": 1
     }
   },
   "recipe": {
     "1": {
       "_id": 1,
       "name": "Brownies",
       "ingredients": ["1/2 cup butter", "1 cup white sugar", "2 eggs", "1 tablespoon vanilla extract", "1/3 cup unsweetened cocoa powder", "1/2 cup flour", "1/4 teaspoon salt", "1/4 teaspoon baking powder"],
       "cuisine": "American",
       "mealType": "Dessert",
       "averageRating": [4, 5, 2, 5, 4],
       "instructions": ["Preheat the oven to 350 degrees.", "Melt the butter.",  "Mix all ingredients together.", "Bake for 30 minutes.", "Enjoy!"],
       "time": "1 hour",
       "restrictions": [1,2,5],
       "img":"http://s2.favim.com/orig/37/brownie-cake-candy-chocolate-delicious-Favim.com-298873.jpg",
       "description":"Delicous fudge-like brownies"
     },
     "2": {
       "_id": 2,
       "name": "Chicken Parmesan",
       "ingredients": ["2 boneless skinless chicken breasts (1 pound)","1/4 cup all purpose flour", "1 egg", "3/4 cup panko breadcrumbs", "1/2 cup parmesan cheese, grated", "2 tablespoons extra virgin olive oil", "1 cup tomato sauce", "1/2 cup mozzarella cheese, shredded", "basil for serving, if desired"],
       "cuisine": "American",
       "mealType": "Main Course",
       "averageRating": [4,3],
       "instructions": ["Cut chicken in half horizontally. Pound each piece until 1/2 inch thick. Sprinkle with salt and pepper.", "Add flour to a shallow dish.", "Add egg to a shallow bowl and whisk, set aside.", "Add breadcrumbs and Parmesan cheese to a shallow bowl and mix to combine.", "Starting with the flour and ending with breadcrumbs, dip the chicken into the flour, egg and Parmesan breadcrumbs.", "Add oil to a large skillet.", "Add chicken two at a time to the skillet. Cook 2-3 minutes on each side or until golden grown and cooked all the way through.", "Place chicken in a pan or sheet tray and top with mozzarella cheese.", "Broil on high until melted and bubbly. Top with tomato sauce and and a sprinkle of basil for serving, if desired. Serve immediately."],
       "time": "30 mins",
       "restrictions": [1,2,5,8],
       "img": "http://farm3.static.flickr.com/2786/4280658636_a707c75ebc.jpg",
       "description":"A traditional Italian dish, this chicken parmesan is seasonally flavored"
     },

     "3": {
       "_id": 3,
       "name": "Zha Jiang Mian",
       "ingredients": ["1/2 pound ground pork", "cooking oil", "1 medium onion (about 1 cup, finely diced)", "4 cups napa cabbage (green parts roughly cut, white parts 1/4 dice", "1 medium zucchini (about 1 cup, diced)", "2 slices ginger",  "1/3 cup ground bean sauce", "1/3 cup hoisin sauce", "4 tablespoons soy sauce", "1/4 cup chicken broth", "1/2 cup water", "3 tablespoons cornstarch, mixed with 3 tablespoons water", "1/2 tablespoons pure sesame oil", "udon noodles", "cucumber"],
       "cuisine": "Chinese",
       "mealType": "Main Course",
       "averageRating": [4, 5, 5],
       "instructions": ["Wash and dry napa cabbage leaves. Green leafy parts may be left in larger pieces (2″ or so), but white parts must be diced small (cut white parts vertically into 1/4″ wide sticks, then cut sticks into 1/4″ dice).", "Cut zucchini in 1/4″ dice also (slice lengthwise into 1/4″ strips, then strips into 1/4″ sticks, then sticks into 1/4″ dice).", "Heat 2 tablespoons of cooking oil in a skillet over medium heat. Add onion and cook until softened; remove to a bowl. Add a bit more oil and cook cabbage until edges look translucent; remove and add to bowl. Add zucchini and cook briefly, just to coat with a bit of oil; remove and add to other vegetables.", "Heat a bit more oil and cook ground meat, breaking it up well with a spatula. When all traces of pink are gone, remove meat to a separate bowl.", "Heat 3 tablespoons of oil in the skillet with the ginger slices. Add ground bean sauce and hoisin sauce (also chunjang and miso, if using) and cook, stirring, until the sauces are bubbling hot and mostly mixed into the oil.", "Add meat back in (try and leave out any juice that may have accumulated), and mix well with sauce. Cook for another minute, then remove ginger slices. Add back vegetables and stir.", "Add soy sauce, water and chicken broth (you may substitute 3 tablespoons water plus 1 tablespoon soy sauce if you don’t have chicken broth) and stir. Cook to heat.", "Mix cornstarch with water, then stir into the skillet. Cook until sauce thickens. Add sesame oil to finish.", "Slice cucumber thinly on the diagonal. Then take one little stack of cucumber slices at a time and cut thin matchsticks. Set aside for garnish.", "Cook fresh noodles in boiling water (if you can’t read the directions, just know that fresh noodles cook quickly, so taste it after 3 minutes and check). Serve immediately, as the noodles get gummy and stick together as they cool. Top with meat sauce and garnish with slivered cucumber."],
       "time": "1 hour",
       "restrictions": [4,10],
       "img": "http://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/bejing-zha-pork-noodles_2.jpg?itok=ov2ONR2x&mtime=1382441740",
       "description":"The bestest best dish on the website"
     },

     "4": {
       "_id": 4,
       "name": "Skillet Chicken Bulgogi",
       "ingredients": ["1/4 cup chopped onion", "5 tablespoons soy sauce", "2 1/2 tablespoons brown sugar", "2 tablespoons minced garlic", "2 tablespoons minced garlic", "2 tablespoons sesame oil",  "1 tablespoon sesame seeds", "1/2 teaspoon cayenne", "salt and ground black pepper to taste", "1  pound skinless, boneless chicken breasts, cut into thin strips"],
       "cuisine": "Korean",
       "mealType": "Main Course",
       "averageRating": [4, 5, 5],
       "instructions": ["Whisk onion, soy sauce, brown sugar, garlic, sesame oil, sesame seeds, cayenne pepper, salt, and black pepper together in a bowl until marinade is smooth.", "Cook and stir chicken and marinade together in a large skillet over medium-high heat until chicken is cooked through, about 15 minutes."],
       "time": "30 mins",
       "restrictions": [4,8],
       "img": "http://www.chowstatic.com/assets/recipe_photos/25679_korean_grilled_chicken.jpg",
       "description":"A Korean dish renowened for its simplicity and flavor"
     },

     "5": {
       "_id": 5,
       "name": "Creamy Smoked Salmon Pasta",
       "ingredients": ["6 tablespoons butter", "1/2 onion, finely chopped", "2 tablespoons all-purpose flour", "2 teaspoons garlic powder", "2 cups skim milk", "1/2 cup grated Romano cheese",  "1  cup frozen green peas, thawed and drained", "1/2 cup canned mushrooms, drained", "10 ounces smoked salmon, chopped", "1 (16 ounce) package penne pasta"],
       "cuisine": "Italian",
       "mealType": "Main Course",
       "averageRating": [4, 2, 5],
       "instructions": ["Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.", "Melt butter in a large skillet over medium heat. Saute onion in butter until tender.", "Stir flour and garlic powder into the butter and onions. Gradually stir in milk. Heat to just below boiling point, and then gradually stir in cheese until the sauce is smooth. Stir in peas and mushrooms., and cook over low heat for 4 minutes.", "Toss in smoked salmon, and cook for 2 more minutes. Serve over pasta."],
       "time": "30 mins",
       "restrictions": [1,5,6],
       "img": "http://images.media-allrecipes.com/userphotos/600x600/131597.jpg",
       "description":"Using only fresh salmon, this recipe is the best in Alaskan cooking"
    },
    "6": {
       "_id": 6,
       "name": "Avocado Strawberry Smoothie",
       "ingredients": ["1 avocado, peeled and pitted", "1 cup orange juice", "1/2 cup vanilla yogurt", "5 ice cubes", "4 frozen whole strawberries", "1 teaspoon honey", "1 teaspoon flax seed meal (optional)"],
       "cuisine": "American",
       "mealType": "Snack",
       "averageRating": [4, 4, 3],
       "instructions": ["Blend avocado, orange juice, vanilla yogurt, ice cubes, strawberries, honey, and flax seed meal together in a blender until smooth, at least 45 seconds."],
       "time": "10 mins",
       "restrictions": [1],
       "img": "http://www.eat-yourself-skinny.com/wp-content/uploads/2013/09/113.jpg",
       "description": "This healthy, tasty smoothie is the perfect way to start your work week"
    }

   },

   "calendar": {
     "1": {
       "Monday": [1,2,3,4], "Tuesday":[2, 3, 4, 5], "Wednesday":[1, 2, 3, 4], "Thursday":[4, 3, 1, 2], "Friday":[2, 5, 3, 4], "Saturday":[2, 5, 3, 4], "Sunday":[2, 5, 3, 4]
     },
     "2": {
       "Monday": [2, 3, 1, 5], "Tuesday":[5, 3, 2, 4], "Wednesday":[2, 3, 1, 5], "Thursday":[2, 5, 3, 4], "Friday":[2, 5, 3, 4], "Saturday":[4, 3, 1, 2], "Sunday":[2, 5, 3, 4]
     },
     "3": {
         "Monday": [5, 3, 1, 2], "Tuesday":[5, 4, 5, 1], "Wednesday":[1, 2, 4, 5], "Thursday":[2, 5, 3, 4], "Friday":[2, 5, 3, 4], "Saturday":[2, 5, 3, 4], "Sunday":[2, 5, 3, 4]
     }
   },

   "restrictions": {
     "1": {
       "_id": 1,
       "tag": "Dairy",
       "recipes": [1,2,5,6]
     },
     "2": {
       "_id": 2,
       "tag": "Eggs",
       "recipes": [1,2]
     },
     "3": {
       "_id": 3,
       "tag": "Nuts",
       "recipes":[]
     },
     "4": {
       "_id": 4,
       "tag": "Soy",
       "recipes":[3,4]
     },
     "5": {
       "_id": 5,
       "tag": "Gluten",
       "recipes":[1,2,5]
     },
     "6": {
       "_id": 6,
       "tag": "Fish",
       "recipes":[5]
     },
     "7": {
       "_id": 7,
       "tag": "Shellfish",
       "recipes":[]
     },
     "8": {
       "_id": 8,
       "tag": "Poultry",
       "recipes":[2,4]
     },
     "9": {
       "_id": 9,
       "tag": "Beef",
       "recipes":[]
     },
     "10": {
       "_id": 10,
       "tag": "Pork",
       "recipes":[3]
     }
   }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
