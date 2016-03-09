//recipe component
import React from 'react';
import {getRecipe} from '../server';

export default class Recipe extends React.Component {
   constructor(props) {
      super(props);
      // The recipe's initial state
      this.state = {};
   }

   refresh() {
      console.log("in the refresh function");
     getRecipe("1", (recipeData) => {
        console.log(recipeData);
      this.setState(recipeData);
     });
   }

   componentDidMount() {
     this.refresh();
   }

   findAverageRating() {
      ratings = this.state.averageRating
   }

   render() {
      // var data = this.state;
      return (
         <div>
         <div className="container recipe">
           <div className="row">
             <div className="col-md-1">
             </div>
             <div className="col-md-10">
               <div className="panel panel-default">
                 <div className="panel-heading2">
                    <div className="row">
                       <div className="col-xs-10">
                          <h1 className="panel-title">{this.state.name}</h1>
                          <br />
                          <ul className="list-inline">
                           <li className="rating">
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                           </li>
                           <li className="time-icons">
                                {this.state.time}
                              <span className="fa fa-clock-o"></span>
                           </li>

                          </ul>
                       </div>
                       <div className="col-xs-2">
                          <ul className="list-inline pull-right">
                           <li className="presentation">
                              <span className="fa fa-heart fa-lg social-but"></span>
                           </li>
                           <li className="presentation">
                              <span className="fa fa-calendar-check-o fa-lg social-but"></span>
                           </li>
                           <li className="presentation">
                              <span className="fa fa-share-square fa-lg social-but"></span>
                           </li>
                          </ul>
                       </div>
                    </div>
                 </div>
                 <div className="panel-body">

                    <div className="row">
                       <div className="col-md-3 ingredient-bar">
                          <ul>
                             <li> pat of butter</li>
                             <li>2 egg yolks</li>
                             <li>2 eggs</li>
                             <li>3 tablespoons white sugar</li>
                             <li>3 1/2 oz white chocolate</li>
                             <li>5 tablespoons butter</li>
                             <li>4 teaspoons unsweetened cocoa powder</li>
                             <li>3 tablespoons flour</li>
                             <li>1 pinch salt</li>
                             <li>1/8 teaspoons vanilla extract</li>
                       </ul>
                    </div>
                 <div className="col-md-9">
                    <ol className="instruction-list">
                      <li className="instruction">
                        <img src="img/lavaCake.jpg" width="35%" align="right" className="img-rounded food-pic pull-right"/>
                        Generously butter the inside of 4 (5 1/2 ounce) ramekins. Place them in a casserole dish.
                      </li>
                      <li className="instruction">
                        Whisk together egg yolks, eggs, and sugar in a bowl until light, foamy, and lemon colored.
                      </li>
                      <li className="instruction">
                        Melt chocolate and butter in a microwave-safe bowl in 30-second intervals, stirring after each melting, 1 to 3 minutes.
                      </li>
                      <li className="instruction">
                        Stir melted chocolate mixture into egg and sugar mixture until combined.
                      </li>
                      <li className="instruction">
                        Sift cocoa powder into the mixture; stir to combine.
                      </li>
                      <li className="instruction">
                        Sift flour and salt into the mixture; stir to combine into a batter.
                      </li>
                      <li className="instruction">
                        Stir vanilla extract into the batter.
                      </li>
                     <li className="instruction">
                        Transfer batter to a resealable plastic bag. Snip one corner of the bag with scissors to create a tip.
                      </li>
                      <li className="instruction">
                        Divide batter evenly between the prepared ramekins; tap gently on the counter to remove any air bubbles.
                      </li>
                      <li className="instruction">
                        Refrigerate 30 minutes.
                      </li>
                      <li className="instruction">
                        Preheat an oven to 425 degrees F (220 degrees C).
                      </li>
                      <li className="instruction">
                        Arrange the ramekins in a casserole dish. Pour enough hot tap water into the casserole dish to reach halfway up the sides of the ramekins.
                      </li>
                      <li className="instruction">
                        Bake in the preheated over for 15-18 minutes. Set aside to cool for 15 minutes.
                      </li>
                      <li className="instruction">
                        Loosen the edges from the ramekin with a knife. Invert each cake onto a plate and dust with powdered sugar.
                      </li>
                    </ol>
                 </div>
             </div>

                 </div>
               </div>

             </div>
             <div className="col-md-1">
             </div>
           </div>
         </div>
         </div>


      )
   }

}
