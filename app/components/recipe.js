//recipe component
import React from 'react';
import {getRecipe} from '../server';
import {addFavorite} from '../server';
import {removeFavorite} from '../server';
import {checkUserFavorites} from '../server';
import {addRecipeToCalendar} from '../server';
export default class Recipe extends React.Component {
   constructor(props) {
      super(props);
      // The recipe's initial state
      this.state = {
         ingredients:[],
         instructions: [],
         currentFavorite: false,
         currentRating: 0
      };
   }

   refresh() {
      getRecipe(this.props.param, (recipeData) => {
         this.setState(recipeData);
         this.findAverageRating()
      });
   }

   componentDidMount() {
      this.refresh();
   }

   /**This method loops over the list of ratings in the recipe and returns their average*/
   findAverageRating() {
      var ratings = this.state.averageRating;
      var sum = 0;
      for( var i = 0; i < ratings.length; i++ ){
         sum += parseInt(ratings[i], 10 );
      }
      var average = Math.floor(sum/ratings.length);
      // return average;
      this.setState({currentRating: average});
   }


   /**
   * The method that handles the user clicking the favorite button
   * relies on the state of the recipe to see if it should be added to the user's
   * favorites - this will have to be changed later
   */
   handleFavoriteClick(clickEvent) {
      clickEvent.preventDefault();
      if (clickEvent.button === 0) {
         var callbackFunction = () => {};
         // this.didUserFavoriteTwo();
         // console.log("this.state.currentFavorite=", this.state.currentFavorite);
         if (!this.state.currentFavorite) {
            addFavorite(this.state._id, 1, callbackFunction);
            this.setState({currentFavorite: true});
         }
         else {
            removeFavorite(this.state._id, 1, callbackFunction);
            this.setState({currentFavorite: false});
         }
         // addFavorite(this.state._id, 1, callbackFunction);
         // console.log("Value of didUserFavoriteTwo is",this.didUserFavorite())
         // if (this.didUserFavoriteTwo()) {
         //    // User clicked 'unfavorite' button.
         //    removeFavorite(this.state._id, 1, callbackFunction);
         // } else {
         //    // User clicked 'favorite' button.
         //    addFavorite(this.state._id, 1, callbackFunction);
         // }
      }
   }

   /*
   * The button that handles the user clicking the unfavorite button (this was a test)
   */
   // handleUnfavoriteClick(clickEvent) {
   //    console.log("in the handleUnfavoriteClick event");
   //    clickEvent.preventDefault();
   //    if (clickEvent.button === 0) {
   //       var callbackFunction =() => {};
   //       removeFavorite(this.state._id, 1, callbackFunction);
   //    }
   // }


   //second stab at seeing if the user has favorited - just passing in the results
   //to setState in recipe. not really working either - had to click twice.
   didUserFavoriteTwo() {
      checkUserFavorites(this.state._id, 1, (data) => {
         this.setState({currentFavorite: data})
      });
   }

   /*
   * Determining if the user already clicked on the favorite button
   * Not currently working. Everything would work if not for the fact that we
   * have to go to the server to get the information about the user, and the async
   * is therefore fucking things up.
   */
   didUserFavorite() {
      // console.log("in the didUserFavorites");
      //server function that will call the user's information when given the id
      //and check to see if the recipe is already in the favorites
      //server function to getUserFavorites
      var result = false;
      checkUserFavorites(this.state._id, 1, (isFavorite) => {
         result = (isFavorite.isRecipeIn);
      });
      setTimeout(() => {
         this.setState({loading : false});
      }, 4);
      if (this.state.loading) {
         this.setState({loading : true});
         return result
      }
   }


   /** adds a recipe to the user's calender (in the dinner slot) when the user
   * clicks on the calendar button
   */
   handleCalendarClick(clickEvent, day) {
      // just adds to the calendar so it doesn't return anything
      addRecipeToCalendar(this.state._id, 1, day, (data) => {});
   }

   render() {
      var favButtonIcon = "fa fa-heart fa-lg";
      if (this.state.currentFavorite) {
         favButtonIcon = "fa fa-times fa-lg";
      }
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
                                          for (var i=0; i<this.state.currentRating; i++) {
                                             elements.push(<span className="fa fa-star fa-lg"></span>)
                                          }
                                          return elements;
                                       })()}
                                       {(() => {
                                          var secondElements=[];
                                          var lessFive = 5-this.state.currentRating;
                                          for (var i=0; i<lessFive; i++) {
                                             secondElements.push(<span className="fa fa-star-o fa-lg"></span>)
                                          }
                                          return secondElements;
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
                                       <button type="button" className="btn btn-default favButton" onClick={(e)=>this.handleFavoriteClick(e)}><span className={favButtonIcon}></span></button>
                                    </li>
                                    <li className="presentation">
                                       <button type="button" className="btn btn-default dropdown-toggle calButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-calendar-check-o fa-lg"></i>
                                    </button>

                                    <ul className="dropdown-menu multiple">
                                       <li><a onClick={(e)=>this.handleCalendarClick(e, "Monday")}>Monday</a></li>
                                       <li><a onClick={(e)=>this.handleCalendarClick(e, "Tuesday")}>Tuesday</a></li>
                                       <li><a onClick={(e)=>this.handleCalendarClick(e, "Wednesday")}>Wednesday</a></li>
                                       <li><a onClick={(e)=>this.handleCalendarClick(e, "Thursday")}>Thursday</a></li>
                                       <li><a onClick={(e)=>this.handleCalendarClick(e, "Friday")}>Friday</a></li>
                                       <li><a onClick={(e)=>this.handleCalendarClick(e, "Saturday")}>Saturday</a></li>
                                       <li><a onClick={(e)=>this.handleCalendarClick(e, "Sunday")}>Sunday</a></li>
                                    </ul>
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
