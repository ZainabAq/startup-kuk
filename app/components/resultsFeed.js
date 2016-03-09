import React from 'react';
import ResultsItem from './resultsItem';
import ResultsSearch from './resultsSearch';
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
      console.log("fuck this shit");
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="results">
        <ResultsSearch onSearch={(searchText) => this.onSearch(searchText)} />
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
