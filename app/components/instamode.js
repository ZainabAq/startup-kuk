import React from 'react';
import InstaIngredientsList from './instaIngredientsList';
import InstaIngredient from './InstaIngredient';

export default class Instamode extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };
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
                <InstaIngredientsList /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
