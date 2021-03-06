import React from 'react';
import InstaIngredientsList from './instaIngredientsList';


export default class Instamode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };
  }

  handleIngredientPost(ingredient) {
    // if the ingredients list is zero, just add the ingredient
    if (this.state.ingredients.length === 0) {
      this.state.ingredients.push(ingredient);
    } else {
      // otherwise, check to see if it's already inside the list, if so, then do not push it in
      var isAlreadyInside = false;
      for (var i=0; i < this.state.ingredients.length; i++) {
        if (this.state.ingredients[i].toLowerCase() === ingredient.toLowerCase()) {
          isAlreadyInside = true;
          alert(ingredient.charAt(0).toUpperCase()+ingredient.slice(1)+" is already included in the ingredients list. Please choose another ingredient that you have not added.");
        }
      }
      if (isAlreadyInside === false) {
        this.state.ingredients.push(ingredient);
      }
    }
    this.setState({ingredients: this.state.ingredients});
    // console.log(this.state.ingredients);
  }

  handleIngredientDelete(ingredient){
    var index = this.state.ingredients.indexOf(ingredient);
    this.state.ingredients.splice(index,1);
    this.setState({ingredients: this.state.ingredients});
  }

  handleClear(){
    location.reload();
  }

  render() {
    return (
      <div>
        <div className="instamode">
          <div className="container">
            <div className="row container-row">
              <div className="col-md-4">
              </div>
              <div className="col-md-10 main-content pull-right">
                <h1>Instant Recipes <img src="img/logo.png" id="logo2" /></h1>
                <div className="description">
                  Looking for a recipe, but don't want to run to the grocery store? Enter in your ingredients down below, and kuk will help you find a recipe that best fits your needs!
                </div>
                <InstaIngredientsList
                    ingredients = {this.state.ingredients}
                    onPost={(commentText) => this.handleIngredientPost(commentText)}
                    onDelete={(ingredient) => this.handleIngredientDelete(ingredient)}
                    onClear={() => this.handleClear()}>
               </InstaIngredientsList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
