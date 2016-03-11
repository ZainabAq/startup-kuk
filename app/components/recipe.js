//recipe component
import React from 'react';
import {getRecipe} from '../server';
import {addFavorite} from '../server';
import {removeFavorite} from '../server';
import {checkUserFavorites} from '../server';
// import {getProfileData} from '../server';
//TODO
//make the ratings work (this will require pulling from the database, and changing the database)
//make the calendar and favorites buttons work
//if time: be able to have the user click on the stars to enter their user rating
//force a re-render: this.setState = this.state

export default class Recipe extends React.Component {
   constructor(props) {
      super(props);
      // The recipe's initial state
      this.state = {
         ingredients:[],
         instructions: [],
         loading: false,
         currentFavorite: false
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
      clickEvent.preventDefault();
      if (clickEvent.button === 0) {
         var callbackFunction = () => {};
         // this.didUserFavoriteTwo();
         console.log("this.state.currentFavorite=", this.state.currentFavorite);
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

   //take two at handling clicks
   handleFavoriteClickTwo(clickEvent) {
      console.log("in the second click handler");
      clickEvent.preventDefault();
      if (clickEvent.button === 0) {
         checkUserFavorites(this.state._id, 1, (isFavorite) => {
         if (isFavorite) {
            removeFavorite(this.state._id, 1, finishCb);
         } else {
            addFavorite(this.state._id, 1, finishCb);
         }
         });
      }
   }

   /*
   * The button that handles the user clicking the unfavorite button
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
   //to setState in recipe. seems to be working.
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
      console.log("in the didUserFavorites");
      //server function that will call the user's information when given the id
      //and check to see if the recipe is already in the favorites
      //server function to getUserFavorites
      //this method right here is fucking up - need to get ellie to look at it (think that maybe the result isn't
   //working the way I think it should work)
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
   //result always returns false - does the syntax I have work to reset it?

   render() {
      var favButtonIcon = "fa fa-heart fa-lg social-but";
      if (this.state.currentFavorite) {
         favButtonIcon = "fa fa-times fa-lg social-but";
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
                                 for (var i=0; i<this.state.userRating; i++) {
                                    elements.push(<span className="fa fa-star fa-lg"></span>)
                                 }
                                 return elements;
                              })()}
                              {(() => {
                                 var secondElements=[];
                                 var lessFive = 5-this.state.userRating;
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
                              <button type="button" className="btn btn-default" onClick={(e)=>this.handleFavoriteClick(e)}><span className={favButtonIcon}></span></button>
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
