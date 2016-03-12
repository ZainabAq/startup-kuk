import React from 'react';
import ResultsItem from './resultsItem';
import Searchbar from './searchbar';
import {findRecipe} from '../server';

export default class ResultsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      query: this.props.query.q
    };
  }

  onSearch(searchText) {
    // If searchText is 'Brownies', navigates to #/results?q=Brownies
    this.context.router.push({ pathname: "/results", query: { q: searchText } });
    // set state of recipeList to the results (newRecipeList) of findRecipe
  }

  refresh() {
    findRecipe(this.state.query, (newRecipeList) => {
      this.setState({recipeList : newRecipeList});
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.query.q
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  render() {
    return (
      <div className="results">
        <Searchbar type="resultsPage" onSearch={(searchText) => this.onSearch(searchText)} />
        {this.state.recipeList.map((recipe) => {
          return (
            <ResultsItem key={recipe._id} data={recipe} />
          );
        })}
      </div>
    );
  }
}

ResultsFeed.contextTypes = {
  router: React.PropTypes.object.isRequired
};
