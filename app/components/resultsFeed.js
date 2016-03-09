import React from 'react';
import ResultsItem from './resultsItem';
import Searchbar from './Searchbar';
import {findRecipe} from '../server';

export default class ResultsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: []
    };
  }

  onSearch(searchText) {
    // If searchText is 'sandals', navigates to #/search/q?=sandals
    this.context.router.push({ pathname: "/search", query: { q: searchText } });
  }

  refresh() {
    findRecipe("Zha Jiang Mian", (newRecipeList) => {
      this.setState({recipeList : newRecipeList});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="results">
        <Searchbar onSearch={(searchText) => this.onSearch(searchText)} />
        {this.state.recipeList.map(() => {
          return (
            <ResultsItem />
          );
        })}
      </div>
    );
  }
}

ResultsFeed.contextTypes = {
  router: React.PropTypes.object.isRequired
};
