var ObjectID = require('mongodb').ObjectID;

var databaseName = "kuk";
// Put the initial mock objects here.
var initialData = {
   "users": {
     "1": {
       "_id": new ObjectID("000000000000000000000001"),
       "firstName": "Stephanie",
       "lastName": "Xie",
       "restrictions": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000004")],
       "email": "sxie@smith.edu",
       "favorites": [new ObjectID("000000000000000000000007"),new ObjectID("000000000000000000000011"),new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000004"),new ObjectID("000000000000000000000009"),new ObjectID("000000000000000000000002")],
       "calendarId": new ObjectID("000000000000000000000001")
   }
 },
   "recipe": {
     "1": {
       "_id": new ObjectID("000000000000000000000001"),
       "name": "Brownies",
       "ingredients": ["1/2 cup butter", "1 cup white sugar", "2 eggs", "1 tablespoon vanilla extract", "1/3 cup unsweetened cocoa powder", "1/2 cup flour", "1/4 teaspoon salt", "1/4 teaspoon baking powder"],
       "cuisine": "American",
       "mealType": "Dessert",
       "averageRating": [4, 5, 2, 5, 4],
       "instructions": ["Preheat the oven to 350 degrees Fahrenheit.", "Melt the butter.",  "Mix all ingredients together.", "Bake for 30 minutes.", "Enjoy!"],
       "time": "1 hour",
       "restrictions": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000005")],
       "img":"http://s2.favim.com/orig/37/brownie-cake-candy-chocolate-delicious-Favim.com-298873.jpg",
       "description":"Delicous fudge-like brownies"
     },
     "2": {
       "_id": new ObjectID("000000000000000000000002"),
       "name": "Chicken Parmesan",
       "ingredients": ["2 boneless skinless chicken breasts (1 pound)","1/4 cup all purpose flour", "1 egg", "3/4 cup panko breadcrumbs", "1/2 cup parmesan cheese, grated", "2 tablespoons extra virgin olive oil", "1 cup tomato sauce", "1/2 cup mozzarella cheese, shredded", "basil for serving, if desired"],
       "cuisine": "American",
       "mealType": "Main Course",
       "averageRating": [4, 3],
       "instructions": ["Cut chicken in half horizontally. Pound each piece until 1/2 inch thick. Sprinkle with salt and pepper.", "Add flour to a shallow dish.", "Add egg to a shallow bowl and whisk, set aside.", "Add breadcrumbs and Parmesan cheese to a shallow bowl and mix to combine.", "Starting with the flour and ending with breadcrumbs, dip the chicken into the flour, egg and Parmesan breadcrumbs.", "Add oil to a large skillet.", "Add chicken two at a time to the skillet. Cook 2-3 minutes on each side or until golden grown and cooked all the way through.", "Place chicken in a pan or sheet tray and top with mozzarella cheese.", "Broil on high until melted and bubbly. Top with tomato sauce and and a sprinkle of basil for serving, if desired. Serve immediately."],
       "time": "30 mins",
       "restrictions": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000005"), new ObjectID("000000000000000000000008")],
       "img": "http://farm3.static.flickr.com/2786/4280658636_a707c75ebc.jpg",
       "description":"A traditional Italian dish, this chicken parmesan is seasonally flavored"
     },

     "3": {
       "_id": new ObjectID("000000000000000000000003"),
       "name": "Zha Jiang Mian",
       "ingredients": ["1/2 pound ground pork", "cooking oil", "1 medium onion (about 1 cup, finely diced)", "4 cups napa cabbage (green parts roughly cut, white parts 1/4 dice", "1 medium zucchini (about 1 cup, diced)", "2 slices ginger",  "1/3 cup ground bean sauce", "1/3 cup hoisin sauce", "4 tablespoons soy sauce", "1/4 cup chicken broth", "1/2 cup water", "3 tablespoons cornstarch, mixed with 3 tablespoons water", "1/2 tablespoons pure sesame oil", "udon noodles", "cucumber"],
       "cuisine": "Chinese",
       "mealType": "Main Course",
       "averageRating": [4, 5, 5],
       "instructions": ["Wash and dry napa cabbage leaves. Green leafy parts may be left in larger pieces (2″ or so), but white parts must be diced small (cut white parts vertically into 1/4″ wide sticks, then cut sticks into 1/4″ dice).", "Cut zucchini in 1/4″ dice also (slice lengthwise into 1/4″ strips, then strips into 1/4″ sticks, then sticks into 1/4″ dice).", "Heat 2 tablespoons of cooking oil in a skillet over medium heat. Add onion and cook until softened; remove to a bowl. Add a bit more oil and cook cabbage until edges look translucent; remove and add to bowl. Add zucchini and cook briefly, just to coat with a bit of oil; remove and add to other vegetables.", "Heat a bit more oil and cook ground meat, breaking it up well with a spatula. When all traces of pink are gone, remove meat to a separate bowl.", "Heat 3 tablespoons of oil in the skillet with the ginger slices. Add ground bean sauce and hoisin sauce (also chunjang and miso, if using) and cook, stirring, until the sauces are bubbling hot and mostly mixed into the oil.", "Add meat back in (try and leave out any juice that may have accumulated), and mix well with sauce. Cook for another minute, then remove ginger slices. Add back vegetables and stir.", "Add soy sauce, water and chicken broth (you may substitute 3 tablespoons water plus 1 tablespoon soy sauce if you don’t have chicken broth) and stir. Cook to heat.", "Mix cornstarch with water, then stir into the skillet. Cook until sauce thickens. Add sesame oil to finish.", "Slice cucumber thinly on the diagonal. Then take one little stack of cucumber slices at a time and cut thin matchsticks. Set aside for garnish.", "Cook fresh noodles in boiling water (if you can’t read the directions, just know that fresh noodles cook quickly, so taste it after 3 minutes and check). Serve immediately, as the noodles get gummy and stick together as they cool. Top with meat sauce and garnish with slivered cucumber."],
       "time": "1 hour",
       "restrictions": [new ObjectID("000000000000000000000004"), new ObjectID("000000000000000000000010")],
       "img": "http://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/bejing-zha-pork-noodles_2.jpg?itok=ov2ONR2x&mtime=1382441740",
       "description":"The bestest best dish on the website"
     },

     "4": {
       "_id": new ObjectID("000000000000000000000004"),
       "name": "Skillet Chicken Bulgogi",
       "ingredients": ["1/4 cup chopped onion", "5 tablespoons soy sauce", "2 1/2 tablespoons brown sugar", "2 tablespoons minced garlic", "2 tablespoons minced garlic", "2 tablespoons sesame oil",  "1 tablespoon sesame seeds", "1/2 teaspoon cayenne", "salt and ground black pepper to taste", "1  pound skinless, boneless chicken breasts, cut into thin strips"],
       "cuisine": "Korean",
       "mealType": "Main Course",
       "averageRating": [4, 5, 5],
       "instructions": ["Whisk onion, soy sauce, brown sugar, garlic, sesame oil, sesame seeds, cayenne pepper, salt, and black pepper together in a bowl until marinade is smooth.", "Cook and stir chicken and marinade together in a large skillet over medium-high heat until chicken is cooked through, about 15 minutes."],
       "time": "30 mins",
       "restrictions": [new ObjectID("000000000000000000000004"), new ObjectID("000000000000000000000008")],
       "img": "http://www.chowstatic.com/assets/recipe_photos/25679_korean_grilled_chicken.jpg",
       "description":"A Korean dish renowened for its simplicity and flavor"
     },

     "5": {
       "_id": new ObjectID("000000000000000000000005"),
       "name": "Smoked Salmon Pasta",
       "ingredients": ["6 tablespoons butter", "1/2 onion, finely chopped", "2 tablespoons all-purpose flour", "2 teaspoons garlic powder", "2 cups skim milk", "1/2 cup grated Romano cheese",  "1  cup frozen green peas, thawed and drained", "1/2 cup canned mushrooms, drained", "10 ounces smoked salmon, chopped", "1 (16 ounce) package penne pasta"],
       "cuisine": "Italian",
       "mealType": "Main Course",
       "averageRating": [4, 2, 5],
       "instructions": ["Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.", "Melt butter in a large skillet over medium heat. Saute onion in butter until tender.", "Stir flour and garlic powder into the butter and onions. Gradually stir in milk. Heat to just below boiling point, and then gradually stir in cheese until the sauce is smooth. Stir in peas and mushrooms., and cook over low heat for 4 minutes.", "Toss in smoked salmon, and cook for 2 more minutes. Serve over pasta."],
       "time": "30 mins",
       "restrictions": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006")],
       "img": "http://images.media-allrecipes.com/userphotos/600x600/131597.jpg",
       "description":"Using only fresh salmon, this recipe is the best in Alaskan cooking"
    },
    "6": {
       "_id": new ObjectID("000000000000000000000006"),
       "name": "Avocado Strawberry Smoothie",
       "ingredients": ["1 avocado, peeled and pitted", "1 cup orange juice", "1/2 cup vanilla yogurt", "5 ice cubes", "4 frozen whole strawberries", "1 teaspoon honey", "1 teaspoon flax seed meal (optional)"],
       "cuisine": "American",
       "mealType": "Snack",
       "averageRating": [4, 4, 3],
       "instructions": ["Blend avocado, orange juice, vanilla yogurt, ice cubes, strawberries, honey, and flax seed meal together in a blender until smooth, at least 45 seconds."],
       "time": "10 mins",
       "restrictions": [new ObjectID("000000000000000000000001")],
       "img": "http://www.eat-yourself-skinny.com/wp-content/uploads/2013/09/113.jpg",
       "description": "This healthy, tasty smoothie is the perfect way to start your work week"
    },
    "7": {
       "_id": new ObjectID("000000000000000000000007"),
       "name": "Lemon Ricotta Pancakes",
       "ingredients": ["2 tablespoons lemon juice", "1 tablespoon cornstarch", "2 cups frozen blueberries", "3 tablespoons white sugar", "1 cup ricotta cheese", "2/3 cup milk", "2 eggs", "1/2 teaspoon ground nutmeg", "1/4 teaspoon salt", "1 cup all-purpose flour", "1 tablespoon baking powder"],
       "cuisine": "American",
       "mealType": "Main Course",
       "averageRating": [5, 5, 4],
       "instructions": ["Mix 2 tablespoons lemon juice and cornstarch together in a bowl until cornstarch dissolves.", "Stir blueberries and 3 tablespoons sugar in a saucepan over medium-high heat. Bring to a boil; reduce heat to low and simmer for 5 minutes. Pour cornstarch mixture into blueberry mixture; cook and stir until mixture thickens slightly. Cover saucepan and remove from heat.", "Whisk ricotta cheese, milk, eggs, sugar, juice from 1 lemon, lemon zest, nutmeg, and salt together in a bowl until well blended. Add flour and baking powder; whisk to combine.", "Heat a lightly oiled griddle or skillet over medium-high heat. Drop batter in 1/4 cup portions onto the griddle and cook until bubbles form and the edges are dry. Flip and cook until browned on the other side. Repeat with remaining batter. Top pancakes with blueberry sauce."],
       "time": "30 mins",
       "restrictions": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000005")],
       "img": "http://images.media-allrecipes.com/userphotos/600x600/1538703.jpg",
       "description": "These pancakes are light and don't leave you feeling too full"
    },
    "8": {
       "_id": new ObjectID("000000000000000000000008"),
       "name": "Quinoa Tabbouleh",
       "ingredients": ["2 cups water", "1 cup quinoa", "1 pinch salt", "1/4 cup olive oil", "1/2 teaspoon sea salt", "1/4 cup lemon juice", "3 tomatoes, diced", "1 cucumber, diced", "2 bunches green onions, diced", "2 carrots, grated", "1 cup fresh parsley, chopped"],
       "cuisine": "Levantine",
       "mealType": "Main Course",
       "averageRating": [1, 4, 5],
       "instructions": ["In a saucepan bring water to a boil. Add quinoa and a pinch of salt. Reduce heat to low, cover and simmer for 15 minutes. Allow to cool to room temperature; fluff with a fork.", "Meanwhile, in a large bowl, combine olive oil, sea salt, lemon juice, tomatoes, cucumber, green onions, carrots and parsley. Stir in cooled quinoa."],
       "time": "30 mins",
       "restrictions": [],
       "img": "http://assets.epicurious.com/photos/54b0b5bec6a78d1a4a60b208/1:1/w_600,h_600/395939_quinoa-tabbouleh_1x1.jpg",
       "description": "Instead of using bulgur like traditional tabouli, this recipe uses quinoa"
    },
    "9": {
       "_id": new ObjectID("000000000000000000000009"),
       "name": "Shrimp Cocktail",
       "ingredients": ["1 quart canola oil", "1 pack of egg roll skins cut into 1/2-inch rounds", "1 pound rock shrimp", "1/2 cup Old Bay seasoning", "2 lemons", "2 bay leaves", "2 cups ketchup", "1/2 cup prepared horseradish", "1 tablespoon Worcestershire sauce", "fresh chive and candied lemon zest for garnish (optional)"],
       "cuisine": "Mexican",
       "mealType": "Appetizer",
       "averageRating": [3, 4, 5],
       "instructions": ["In a sauce pan heat canola oil to approximately 325 degrees using a candy thermometer (if you do not have a candy thermometer, keep the oil over a medium high heat).", "Place the egg roll skins into the hot oil one at a time, flipping them when hey become crisply. Remove from the oil and set on a paper towel to drip dry.", "Fill a sauce pan with enough water to cover the shrimp and bring it to a simmer.", "Add Old Bay seasoning, juice of 1 lemon and bay leaves.", "Bring back up to a simmer and add the rock shrimp. The rock shrimp should only take about 5–7 minutes to poach.", "Strain the shrimp from the water and rapidly cool under cold water. Set aside.", "Blend ketchup in a mixing bowl with horseradish, juice of 1 lemon and 1 tablespoon of Worcestershire sauce.", "Toss the shrimp in your cocktail sauce and place them on top of wonton discs. Garnish with chive and candied lemon zest."],
       "time": "20 mins",
       "restrictions": [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000007")],
       "img": "http://saltlakemagazine.com/site_media/uploads/February2014/shrimpcocktails99.jpg",
       "description": "Surprise your guests with this delicioso appetizer"
    },
    "10": {
       "_id": new ObjectID("000000000000000000000010"),
       "name": "Greek Omelet",
       "ingredients": ["2 tablespoons olive oil", "6 spears fresh asparagus, trimmed and chopped", "1/2 red bell pepper, chopped", "1/2 cup cherry tomatoes, halved", "1/2 cup chopped fresh spinach", "1/2 teaspoon minced garlic", "1/2 teaspoon dried oregano", "1/2 teaspoon dried basil", "2 tablespoons butter", "6 large eggs", "1/4 cup whole milk", "1/2 cup crumbled feta cheese", "1/4 cup shredded cheddar cheese"],
       "cuisine": "Greek",
       "mealType": "Main Course",
       "averageRating": [5, 5, 5],
       "instructions": ["Heat olive oil in a large skillet over medium heat; cook and stir asparagus and red bell pepper until the vegetables start to soften, about 3 minutes. Stir in cherry tomatoes, spinach, garlic, oregano, basil, and salt and continue cooking until tomatoes are soft and spinach has cooked down, another 3 to 5 minutes. Remove from heat and transfer vegetables to a plate.", "Melt butter in clean skillet over medium heat. Whisk eggs and milk in a bowl and pour into hot butter, swirling skillet to cover entire bottom with egg mixture. Pull up an edge of the omelet with a spatula and tilt pan to allow unset egg to run underneath and cook; continue around pan, lifting omelet edge and tilting pan, until all the egg mixture is set. Sprinkle omelet with salt.", "Spoon cooked asparagus mixture onto one side of the omelet and sprinkle with feta and Cheddar cheeses. Gently fold half the omelet over the vegetables and cheese and press edges lightly to seal in the filling. Cook until filling is hot and Cheddar cheese has melted, 1 to 2 more minutes. Cut in slices to serve."],
       "time": "30 mins",
       "restrictions": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")],
       "img": "http://hungryjackpotatoes.com/wp-content/uploads/2013/04/omlet.jpg",
       "description": "This omelet is filled with a mixture of cherry tomatoes, spinach, bell pepper, and asparagus"
    },
    "11": {
       "_id": new ObjectID("000000000000000000000011"),
       "name": "Classic Sangria",
       "ingredients": ["1 lemon", "1 lime", "1 orange", "1 1/2 cups rum", "1/2 cup white sugar", "1 (750 milliliter) bottle dry red wine", "1 cup orange juice"],
       "cuisine": "Spanish",
       "mealType": "Snack",
       "averageRating": [3, 4, 5],
       "instructions": ["Have the fruit, rum, wine, and orange juice well chilled. Slice the lemon, lime and orange into thin rounds and place in a large glass pitcher. Pour in the rum and sugar. Chill in refrigerator for 2 hours to develop the flavors.", "When ready to serve, crush the fruit lightly with a wooden spoon and stir in the wine and orange juice. Adjust sweetness to taste."],
       "time": "2 hrs 10 mins",
       "restrictions": [],
       "img": "https://bigoven-res.cloudinary.com/image/upload/classic-spanish-sangria-5.jpg",
       "description": "This is an authentic version of the popular wine drink"
    },
    "12": {
       "_id": new ObjectID("000000000000000000000012"),
       "name": "Green Tea Muffin",
       "ingredients": ["100g unsalted butter", "1/2 cup cane sugar", "1/2 milk", "1 1/2 cup flour", "1 1/2 teaspoon baking powder", "2 tablespoons green tea matcha powder", "1/2 to 1 cup chunked white chocolate"],
       "cuisine": "Japanese",
       "mealType": "Dessert",
       "averageRating": [5, 5, 5],
       "instructions": ["Preheat oven to 340 Fahrenheit.", "Warm milk to body temperature. Butter and milk at room temperature. Shift dry ingredients together.", "Beat butter until fluffy. Add sugar and beat. Add beaten egg slowly, and then add warmed milk slowly until combined well.", "Pour the batter into muffin pan. Insert chunked chocolate into the batter.", "Bake for about 25 minutes."],
       "time": "1 hr",
       "restrictions": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000005")],
       "img": "http://cdn.cooksnaps.com/media/W1siZiIsIjIwMTQvMDcvMDYvMjNfMDlfMjdfNDAzXzcyZTQ4NGU2MTk5NDBlYTMzMWE1MjQxNjBhMzFlNGVlIl0sWyJwIiwiY29udmVydCIsIi1hdXRvLW9yaWVudCJdLFsicCIsInRodW1iIiwiNjQweDUwMCMiXSxbImUiLCJqcGciLCItc3RyaXAgLXF1YWxpdHkgODAiXV0.jpg",
       "description": "A delicious, rich muffin with the essence of green tea"
    },
    "13": {
       "_id": new ObjectID("000000000000000000000013"),
       "name": "Vegan Smoothie",
       "ingredients": ["1 banana", "1/3 cup frozen chopped spinach", "1/2 cup frozen mixed fruit", "1 tablespoon flax seed meal", "1/2 scoop vegan protein powder", "1 tablespoon chia seeds", "1/2 teaspoon matcha green tea powder"],
       "cuisine": "American",
       "mealType": "Snack",
       "averageRating": [5, 5, 4],
       "instructions": ["Layer banana, spinach, mixed fruit, flax meal, protein powder, chia seeds, and matcha powder in a blender in the order listed; add enough water to cover. Cover blender and blend until smooth."],
       "time": "10 mins",
       "restrictions": [],
       "img": "http://images.media-allrecipes.com/userphotos/600x600/3373648.jpg",
       "description": "A great breakfast green tea smoothie to pair with some toast and coffee"
    },
    "14": {
       "_id": new ObjectID("000000000000000000000014"),
       "name": "Hazelnut Fruit Crepes",
       "ingredients": ["2 cup chocolate-flavored hazelnut spread", "8 bananas, sliced", "1 can (7 ounce) pressurized whipped cream", "1 cup all-purpose flour", "2 egg", "1⁄2 cup milk", "1⁄2 cup water", "1⁄4 tsp salt", "2 tbsp butter, melted"],
       "cuisine": "French",
       "mealType": "Dessert",
       "averageRating": [5, 5, 4],
       "instructions": ["In a large mixing bowl, whisk together flour and eggs. Gradually add in milk and water, stirring to combine. Add salt and butter; beat until smooth.", "Heat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each crepe. Tilt the pan with a circular motion so that the batter coats the surface evenly.", "Cook the crepe for about 2 minutes until the bottom is light brown. Loosen with a spatula, turn, and cook the other side. Remove from the pan and repeat with remaining batter.", "Spread 1/4 cup chocolate flavored hazelnut spread onto each crepe. Arrange 1 sliced banana down the center. Roll up and place in a warm skillet over medium heat for about 90 seconds. Transfer to plates and serve topped with whipped cream."],
       "time": "40 mins",
       "restrictions": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000005")],
       "img": "https://cdn.cpnscdn.com/static.coupons.com/ext/kitchme/images/recipes/1200x800/chocolate-hazelnut-fruit-crepes_9311.jpg",
       "description": "Soft and crunchy, this fruity crepe is complemented with a hint of hazelnut"
    },
    "16": {
      "_id": new ObjectID("000000000000000000000100"),
      "name": "Please add a recipe here!",
      "ingredients":["STARVATION"],
      "averageRating": [0],
      "instructions": ["If you don't want to stay hungry for that meal of the day, go to our browse selection and add a recipe"],
      "img": "http://www.taher.com/wp-content/uploads/2015/01/why-are-you-hungry.jpg"
    }

   },

   "calendars": {
     "1": {
     "_id": new ObjectID("000000000000000000000001"),
     1: {
       "Monday":[
         new ObjectID("000000000000000000000001"),
         new ObjectID("000000000000000000000002"),
         new ObjectID("000000000000000000000003"),
         new ObjectID("000000000000000000000004")],
      "Tuesday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004"),
        new ObjectID("000000000000000000000005")],
      "Wednesday":[
        new ObjectID("000000000000000000000001"),
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")],
      "Thursday":[
        new ObjectID("000000000000000000000004"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000001"),
        new ObjectID("000000000000000000000002")],
      "Friday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")],
      "Saturday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")],
      "Sunday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")]
     },

     2: {
       "Monday": [
         new ObjectID("000000000000000000000002"),
         new ObjectID("000000000000000000000003"),
         new ObjectID("000000000000000000000001"),
         new ObjectID("000000000000000000000005")],
      "Tuesday":[
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000004")],
      "Wednesday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000001"),
        new ObjectID("000000000000000000000005")],
      "Thursday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")],
      "Friday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")],
      "Saturday":[
        new ObjectID("000000000000000000000004"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000001"),
        new ObjectID("000000000000000000000002")],
      "Sunday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")]
     },

       3: {
         "Monday": [
           new ObjectID("000000000000000000000005"),
           new ObjectID("000000000000000000000003"),
           new ObjectID("000000000000000000000001"),
           new ObjectID("000000000000000000000002")],
        "Tuesday":[
          new ObjectID("000000000000000000000005"),
          new ObjectID("000000000000000000000004"),
          new ObjectID("000000000000000000000005"),
          new ObjectID("000000000000000000000001")],
        "Wednesday":[
          new ObjectID("000000000000000000000001"),
          new ObjectID("000000000000000000000002"),
          new ObjectID("000000000000000000000004"),
          new ObjectID("000000000000000000000005")],
        "Thursday":[
          new ObjectID("000000000000000000000002"),
          new ObjectID("000000000000000000000005"),
          new ObjectID("000000000000000000000003"),
          new ObjectID("000000000000000000000004")],
        "Friday":[
          new ObjectID("000000000000000000000002"),
          new ObjectID("000000000000000000000005"),
          new ObjectID("000000000000000000000003"),
          new ObjectID("000000000000000000000004")],
        "Saturday":[
          new ObjectID("000000000000000000000002"),
          new ObjectID("000000000000000000000005"),
          new ObjectID("000000000000000000000003"),
          new ObjectID("000000000000000000000004")],
        "Sunday":[
          new ObjectID("000000000000000000000002"),
          new ObjectID("000000000000000000000005"),
          new ObjectID("000000000000000000000003"),
          new ObjectID("000000000000000000000004")]
     },

     4: {
       "Monday": [
         new ObjectID("000000000000000000000002"),
         new ObjectID("000000000000000000000003"),
         new ObjectID("000000000000000000000001"),
         new ObjectID("000000000000000000000005")],
      "Tuesday":[
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000004")],
      "Wednesday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000001"),
        new ObjectID("000000000000000000000005")],
      "Thursday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")],
      "Friday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")],
      "Saturday":[
        new ObjectID("000000000000000000000004"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000001"),
        new ObjectID("000000000000000000000002")],
      "Sunday":[
        new ObjectID("000000000000000000000002"),
        new ObjectID("000000000000000000000005"),
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000004")]
     }
 }
 },

   "restrictions": {
     "1": {
       "_id": new ObjectID("000000000000000000000001"),
       "tag": "Dairy",
       "recipes": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000005"),new ObjectID("000000000000000000000006"), new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000010"), new ObjectID("000000000000000000000012"), new ObjectID("000000000000000000000014")]
     },
     "2": {
       "_id": new ObjectID("000000000000000000000002"),
       "tag": "Eggs",
       "recipes": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000009"), new ObjectID("000000000000000000000010"), new ObjectID("000000000000000000000012"), new ObjectID("000000000000000000000014")]
     },
     "3": {
       "_id": new ObjectID("000000000000000000000003"),
       "tag": "Nuts",
       "recipes":[new ObjectID("000000000000000000000014")]
     },
     "4": {
       "_id": new ObjectID("000000000000000000000004"),
       "tag": "Soy",
       "recipes":[new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000004")]
     },
     "5": {
       "_id": new ObjectID("000000000000000000000005"),
       "tag": "Gluten",
       "recipes":[new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000005"), new ObjectID("000000000000000000000007"), new ObjectID("000000000000000000000012"), new ObjectID("000000000000000000000014")]
     },
     "6": {
       "_id": new ObjectID("000000000000000000000006"),
       "tag": "Fish",
       "recipes":[new ObjectID("000000000000000000000005")]
     },
     "7": {
       "_id": new ObjectID("000000000000000000000007"),
       "tag": "Shellfish",
       "recipes":[new ObjectID("000000000000000000000009")]
     },
     "8": {
       "_id": new ObjectID("000000000000000000000008"),
       "tag": "Poultry",
       "recipes":[new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000004")]
     },
     "9": {
       "_id": new ObjectID("000000000000000000000009"),
       "tag": "Beef",
       "recipes":[]
     },
     "10": {
       "_id": new ObjectID("000000000000000000000010"),
       "tag": "Pork",
       "recipes":[new ObjectID("000000000000000000000003")]
     }
   }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
