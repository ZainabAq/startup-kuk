import React from 'react';

export default class ResultsSearch extends React.Component {
  render() {
    return (
      <div className="results">
        <form className="large-search" role="search">
          <div className="input-group">
            <input type="text" className="form-control kuk-search" placeholder="Search Kuk" />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default">
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </form>
      </div>
    )
  }


}
