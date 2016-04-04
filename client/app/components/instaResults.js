import React from 'react';
import ResultsItem from './resultsItem';
import {findRecipeByIngredients} from '../server'

export default class InstaResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.ingredients,
      recipes: [],
      searchClicked: false
    }
  }

  onSearch() {
    findRecipeByIngredients(this.state.ingredients, (matchedRecipes) => {
      this.setState({recipes: matchedRecipes});
    });
    this.setState({searchClicked: true});
  }

  onClear() {
    this.setState({ ingredients: [],
                    searchClicked: false});
  }

  render() {
    if (this.state.searchClicked === false) {
      return(
        <button type="submit" className="findrecipe-btn" onClick={() => this.onSearch()}>Find a Recipe! </button>
      );
    } else if (this.state.recipes.length > 0 ){
      return (
        <div className="results">
          {this.state.recipes.map((recipe) => {
            return (
              <ResultsItem key={recipe._id} data={recipe} />
            );
          })}
          <button type="submit" className="findrecipe-btn" onClick={() => this.onClear()}>Clear Search</button>
        </div>
      );
    } else {
      return(
        <div>
          <p>We were unable to find anything matching the ingredient you entered. Please try again.</p>
          <button type="submit" className="findrecipe-btn" onClick={() => this.onClear()}>Clear Search</button>
        </div>
      )
    }
  }
}
