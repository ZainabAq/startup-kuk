import React from 'react';
import ResultsItem from './resultsItem';
import ResultsSearch from './resultsSearch';
import {findName} from '../server';

export default class ResultsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  onSearch(searchText) {
    // If searchText is 'sandals', navigates to #/search/q?=sandals
    this.context.router.push({ pathname: "/search", query: { q: searchText } });
  }

  refresh() {
    findName("Zha Jiang Mian", (recipeName) => {
      this.setState(recipeName);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="results">
        <ResultsSearch onSearch={(searchText) => this.onSearch(searchText)} />
        {this.state.contents.map(() => {
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
