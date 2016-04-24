import React from 'react';
import ResultsItem from './resultsItem';
import {findRecipeByIngredients} from '../server'
import {findRecipeByOnlyIngredients} from '../server'

export default class InstaResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.ingredients,
      recipes: [],
      searchClicked: false,
      ingredientsOnly: true
    }
  }

  handleChecked(checkEvent) {
    if (checkEvent.target.checked) {
      // console.log("Should be true!")
      this.setState({ingredientsOnly : false});
      // console.log(this.state.ingredientsOnly);
    } else {
      // console.log("Should be false!")
      this.setState({ingredientsOnly : true});
      // console.log(this.state.ingredientsOnly);
    }
  }

  onSearch() {
    if (this.state.ingredientsOnly) {
      findRecipeByIngredients(this.state.ingredients, (matchedRecipes) => {
        this.setState({recipes: matchedRecipes});
      });
      this.setState({searchClicked: true});
    } else {
      findRecipeByOnlyIngredients(this.state.ingredients, (matchedRecipes) => {
        this.setState({recipes: matchedRecipes});
      });
      this.setState({searchClicked: true});
    }
  }

  handleClear() {
    this.setState({
      searchClicked: false,
      ingredientsOnly: true
    });
    this.props.onClear();
  }

  render() {
    if (this.state.searchClicked === false) {
      return(
        <div>
          <div className="checkbox">
            <label>
              <input value={1} type="checkbox" onChange={(e) => {
                  this.handleChecked(e);
                }}/>Find recipes that ONLY contain these ingredients
            </label>
          </div>
          <button type="submit" className="btn findrecipe-btn" onClick={() => this.onSearch()}>Find a Recipe! </button>
        </div>
      );
    } else if (this.state.recipes.length > 0 ){
      return (
        <div className="results">
          {this.state.recipes.map((recipe) => {
            return (
              <ResultsItem key={recipe._id} data={recipe} />
            );
          })}
          <button type="submit" className="btn findrecipe-btn" onClick={() => this.handleClear()}>Clear Search</button>
        </div>
      );
    } else {
      return(
        <div>
          <p>We were unable to find anything matching the ingredient(s) you entered. Please try again.</p>
          <button type="submit" className="btn findrecipe-btn" onClick={() => this.handleClear()}>Clear Search</button>
        </div>
      )
    }
  }
}
