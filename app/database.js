import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var kuk = null;

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": {
    "1": {
      "_id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "restrictions": ["1","4"],
      "email": "jdoe@gmail.com",
      "favorites": [2,3,5,1,4,2,3,5],
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
      "instructions": ["Preheat the oven to 350 degrees.", "Melt the butter.", "Bake for 30 minutes.", "Mix the remaining ingredients together.", "Enjoy!"],
      "userRating": 4,
      "time": "1 hour",
      "restrictions": [1,2,5],
      "img":"http://s2.favim.com/orig/37/brownie-cake-candy-chocolate-delicious-Favim.com-298873.jpg",
      "description":"Some sample text about the recipe this hexagon leads to"
    },
    "2": {
      "_id": 2,
      "name": "Chicken Parmesan",
      "ingredients": ["2 boneless skinless chicken breasts (1 pound)","1/4 cup all purpose flour", "1 egg", "3/4 cup panko breadcrumbs", "1/2 cup parmesan cheese, grated", "2 tablespoons extra virgin olive oil", "1 cup tomato sauce", "1/2 cup mozzarella cheese, shredded", "basil for serving, if desired"],
      "cuisine": "American",
      "mealType": "Main Course",
      "averageRating": [4,3],
      "instructions": ["Cut chicken in half horizontally. Pound each piece until 1/2 inch thick. Sprinkle with salt and pepper.", "Add flour to a shallow dish.", "Add egg to a shallow bowl and whisk, set aside.", "Add breadcrumbs and Parmesan cheese to a shallow bowl and mix to combine.", "Starting with the flour and ending with breadcrumbs, dip the chicken into the flour, egg and Parmesan breadcrumbs.", "Add oil to a large skillet.", "Add chicken two at a time to the skillet. Cook 2-3 minutes on each side or until golden grown and cooked all the way through.", "Place chicken in a pan or sheet tray and top with mozzarella cheese.", "Broil on high until melted and bubbly. Top with tomato sauce and and a sprinkle of basil for serving, if desired. Serve immediately."],
      "userRating": 3,
      "time": "30 mins",
      "restrictions": [1,2,5,8],
      "img": "http://images.media-allrecipes.com/userphotos/600x600/432846.jpg",
      "description":"Some sample text about the recipe this hexagon leads to"
    },

    "3": {
      "_id": 3,
      "name": "Zha Jiang Mian",
      "ingredients": ["1/2 pound ground pork", "cooking oil", "1 medium onion (about 1 cup, finely diced)", "4 cups napa cabbage (green parts roughly cut, white parts 1/4 dice", "1 medium zucchini (about 1 cup, diced)", "2 slices ginger",  "1/3 cup ground bean sauce", "1/3 cup hoisin sauce", "4 tablespoons soy sauce", "1/4 cup chicken broth", "1/2 cup water", "3 tablespoons cornstarch, mixed with 3 tablespoons water", "1/2 tablespoons pure sesame oil", "udon noodles", "cucumber"],
      "cuisine": "Chinese",
      "mealType": "Main Course",
      "averageRating": [4, 5, 5],
      "instructions": ["Wash and dry napa cabbage leaves. Green leafy parts may be left in larger pieces (2″ or so), but white parts must be diced small (cut white parts vertically into 1/4″ wide sticks, then cut sticks into 1/4″ dice).", "Cut zucchini in 1/4″ dice also (slice lengthwise into 1/4″ strips, then strips into 1/4″ sticks, then sticks into 1/4″ dice).", "Heat 2 tablespoons of cooking oil in a skillet over medium heat. Add onion and cook until softened; remove to a bowl. Add a bit more oil and cook cabbage until edges look translucent; remove and add to bowl. Add zucchini and cook briefly, just to coat with a bit of oil; remove and add to other vegetables.", "Heat a bit more oil and cook ground meat, breaking it up well with a spatula. When all traces of pink are gone, remove meat to a separate bowl.", "Heat 3 tablespoons of oil in the skillet with the ginger slices. Add ground bean sauce and hoisin sauce (also chunjang and miso, if using) and cook, stirring, until the sauces are bubbling hot and mostly mixed into the oil.", "Add meat back in (try and leave out any juice that may have accumulated), and mix well with sauce. Cook for another minute, then remove ginger slices. Add back vegetables and stir.", "Add soy sauce, water and chicken broth (you may substitute 3 tablespoons water plus 1 tablespoon soy sauce if you don’t have chicken broth) and stir. Cook to heat.", "Mix cornstarch with water, then stir into the skillet. Cook until sauce thickens. Add sesame oil to finish.", "Slice cucumber thinly on the diagonal. Then take one little stack of cucumber slices at a time and cut thin matchsticks. Set aside for garnish.", "Cook fresh noodles in boiling water (if you can’t read the directions, just know that fresh noodles cook quickly, so taste it after 3 minutes and check). Serve immediately, as the noodles get gummy and stick together as they cool. Top with meat sauce and garnish with slivered cucumber."],
      "userRating": 5,
      "time": "1 hour",
      "restrictions": [4,5,9],
      "img": "http://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/bejing-zha-pork-noodles_2.jpg?itok=ov2ONR2x&mtime=1382441740",
      "description":"Some sample text about the recipe this hexagon leads to"
    },

    "4": {
      "_id": 4,
      "name": "Skillet Chicken Bulgogi",
      "ingredients": ["1/4 cup chopped onion", "5 tablespoons soy sauce", "2 1/2 tablespoons brown sugar", "2 tablespoons minced garlic", "2 tablespoons minced garlic", "2 tablespoons sesame oil",  "1 tablespoon sesame seeds", "1/2 teaspoon cayenne", "salt and ground black pepper to taste", "1  pound skinless, boneless chicken breasts, cut into thin strips"],
      "cuisine": "Korean",
      "mealType": "Main Course",
      "averageRating": [4, 5, 5],
      "instructions": ["Whisk onion, soy sauce, brown sugar, garlic, sesame oil, sesame seeds, cayenne pepper, salt, and black pepper together in a bowl until marinade is smooth.", "Cook and stir chicken and marinade together in a large skillet over medium-high heat until chicken is cooked through, about 15 minutes."],
      "userRating": 5,
      "time": "30 mins",
      "restrictions": [1,5,9],
      "img": "http://www.chowstatic.com/assets/recipe_photos/25679_korean_grilled_chicken.jpg",
      "description":"Some sample text about the recipe this hexagon leads to"
    },

    "5": {
      "_id": 5,
      "name": "Creamy Smoked Salmon Pasta",
      "ingredients": ["6 tablespoons butter", "1/2 onion, finely chopped", "2 tablespoons all-purpose flour", "2 teaspoons garlic powder", "2 cups skim milk", "1/2 cup grated Romano cheese",  "1  cup frozen green peas, thawed and drained", "1/2 cup canned mushrooms, drained", "10 ounces smoked salmon, chopped", "1 (16 ounce) package penne pasta"],
      "cuisine": "Italian",
      "mealType": "Main Course",
      "averageRating": [4, 2, 5],
      "instructions": ["Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.", "Melt butter in a large skillet over medium heat. Saute onion in butter until tender.", "Stir flour and garlic powder into the butter and onions. Gradually stir in milk. Heat to just below boiling point, and then gradually stir in cheese until the sauce is smooth. Stir in peas and mushrooms., and cook over low heat for 4 minutes.", "Toss in smoked salmon, and cook for 2 more minutes. Serve over pasta."],
      "userRating": 2,
      "time": "30 mins",
      "restrictions": [5,9],
      "img": "http://images.media-allrecipes.com/userphotos/600x600/131597.jpg",
      "description":"Some sample text about the recipe this hexagon leads to"
    }
  },
  "calendar": {
    "1": {
      "_id": 1,
      "contents": {"Monday": [1,2,3,4], "Tuesday":[5], "Wednesday":[], "Thursday":[], "Friday":[], "Saturday":[], "Sunday":[]}
    },
    "2": {
      "_id": 2,
      "contents": {"Monday": [], "Tuesday":[], "Wednesday":[], "Thursday":[], "Friday":[], "Saturday":[], "Sunday":[]}
    },
    "3": {
      "_id": 3,
      "contents": {"Monday": [], "Tuesday":[], "Wednesday":[], "Thursday":[], "Friday":[], "Saturday":[], "Sunday":[]}
    },
    "4": {
      "_id": 4,
      "contents": {"Monday": [], "Tuesday":[], "Wednesday":[], "Thursday":[], "Friday":[], "Saturday":[], "Sunday":[]}
    }
  },
  "restrictions": {
    "1": {
      "_id": 1,
      "tag": "Dairy",
      "recipes": [1,2,4]
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
      "recipes":[3]
    },
    "5": {
      "_id": 5,
      "tag": "Gluten",
      "recipes":[1,2,3,4,5]
    },
    "6": {
      "_id": 6,
      "tag": "Fish",
      "recipes":[]
    },
    "7": {
      "_id": 7,
      "tag": "Shellfish",
      "recipes":[]
    },
    "8": {
      "_id": 8,
      "tag": "Poultry",
      "recipes":[2]
    },
    "9": {
      "_id": 9,
      "tag": "Beef",
      "recipes":[]
    },
    "10": {
      "_id": 10,
      "tag": "Pork",
      "recipes":[3,4,5]
    }
  }
};

var data = JSON.parse(localStorage.getItem(kuk));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Get the entire collection.
 */
export function getCollection(collection) {
  return JSONClone(data[collection]);
}

/**
* Emulates writing a "document" to a NoSQL database.
*/
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(kuk, JSON.stringify(data));
}

/**
* Adds a new document to the NoSQL database.
*/
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
* Reset our browser-local database.
*/
export function resetDatabase() {
  localStorage.setItem(kuk, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
* Reset database button.
*/
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
          resetDatabase();
          window.alert("Database reset! Refreshing the page now...");
          document.location.reload(false);
        }}>Reset Mock DB</button>
      );
    }
  }

  ReactDOM.render(
    <ResetDatabase />,
    document.getElementById('db-reset')
  );
