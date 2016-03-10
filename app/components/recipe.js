//recipe component
import React from 'react';
import {getRecipe} from '../server';
import {addFavorite} from '../server';
import {removeFavorite} from '../server';
import {checkUserFavorites} from '../server';
//TODO
//make the ratings work (this will require pulling from the database, and changing the database)
//make the calendar and favorites buttons work

export default class Recipe extends React.Component {
   constructor(props) {
      super(props);
      // The recipe's initial state
      this.state = {
         ingredients:[],
         instructions: []
      };
   }

   refresh() {
     getRecipe(this.props.param, (recipeData) => {
      this.setState(recipeData);
     });
   }

   componentDidMount() {
     this.refresh();
   }

   findAverageRating() {
      var ratings = this.state.averageRating;
      var sum = 0;
      for( var i = 0; i < ratings.length; i++ ){
         sum += parseInt(ratings[i], 10 );
      }
      var average = sum/ratings.length;
      return average;
   }


   /**
   * The button that handles the user clicking the favorite tag
   */
   handleFavoriteClick(clickEvent) {
      console.log("in the handleFavoriteClick");
      clickEvent.preventDefault();
      if (clickEvent.button === 0) {
         var callbackFunction = () => {};

         if (this.didUserFavorite()) {
            // User clicked 'unlike' button.
            removeFavorite(this.state._id, 1, callbackFunction);
         } else {
            // User clicked 'like' button.
            addFavorite(this.state._id, 1, callbackFunction);
         }
      }
   }

   /*
   * Determining if the user already clicked on the favorite button
   */
   didUserFavorite() {
      console.log("in the didUserFavorites");
      //server function that will call the user's information when given the id
      //and check to see if the recipe is already in the favorites
      //server function to getUserFavorites
      var result = false;
      checkUserFavorites(this.state._id, 1, (isFavorite) => {
         result = (isFavorite);
      });
      return result;
   }

   render() {
      // var data = this.state;
      // var ratingInRecipe = this.findAverageRating();
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
                              {(() => {
                                 var elements=[];
                                 for (var i=0; i<this.state.userRating; i++) {
                                    elements.push(<span className="fa fa-star"></span>)
                                 }
                                 return elements;
                              })()}
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
                              <button type="button" className="btn btn-default" onClick={(e)=>this.handleFavoriteClick(e)}><span className="fa fa-heart fa-lg social-but"></span></button>
                           </li>
                           <li className="presentation">
                              <button type="button" className="btn btn-default"><span className="fa fa-calendar-check-o fa-lg social-but"></span></button>
                           </li>
                          </ul>
                       </div>
                    </div>
                 </div>
                 <div className="panel-body">

                    <div className="row">
                       <div className="col-md-3 ingredient-bar">
                          <ul>
                             {this.state.ingredients.map((listItem, i) => {
                                return (
                                   <li key={i}>{listItem}</li>
                                );
                             })}
                       </ul>
                    </div>
                 <div className="col-md-9">
                    <img src={this.state.img} width="35%" align="right" className="img-rounded food-pic pull-right"/>
                    <ol className="instruction-list">
                       {this.state.instructions.map((listItem, i) => {
                         return (
                            <li key={i}>{listItem}</li>
                         );
                       })}
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
