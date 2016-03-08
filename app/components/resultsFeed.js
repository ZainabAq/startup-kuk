import React from 'react';
import ResultsItem from './resultsItem';
import ResultsSearch from './resultsSearch';

export default class ResultsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: []
    };
  }

  render() {
    return (
      <div className="results">
        <ResultsSearch />
        {this.state.contents.map(() => {
          return (
            <ResultsItem />
          );
        })}
      </div>
    );
  }
}
