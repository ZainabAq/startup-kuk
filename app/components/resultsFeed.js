import React from 'react';
import ResultsItem from './resultsItem';
import {findRecipe} from '../server';

export default class ResultsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      query: this.props.query.q
    };
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
    this.refresh();
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <h2><center>Search Results for "{this.state.query}"</center></h2>
        <div id="page-content-wrapper">
          <div className="col-md-offset-2 col-md-8 container-fluid results">
            {this.state.recipeList.map((recipe) => {
              return (
                <ResultsItem key={recipe._id} data={recipe} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
