import React from 'react';

// Search bar that shows up on results page

// Issues to fix:
// Searched text doesn't stay in search bar
// If you go to another page and then go back to the results page, the results aren't there anymore
// How to combine navbar search bar with this one?

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key == "Enter") {
      var search = this.state.value.trim();
      if (search !== "") {
        // Search keyword
        this.props.onSearch(this.state.value);
        this.setState({value: ""});
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    var search = this.state.value.trim();
    if (search !== "") {
      // Search keyword
      this.props.onSearch(this.state.value);
      this.setState({value: ""});
    }
  }

  render() {
    return (
      <div className="results">
        <form className="large-search" role="search">
          <div className="input-group">
            <input type="text" className="form-control kuk-search" placeholder="Search Kuk"
              value={this.state.value} onChange={(e) => this.handleChange(e)}
              onKeyUp={(e) => this.handleKeyUp(e)} />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default searchButton" onClick={(e) => this.handleClick(e)}>
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </form>
      </div>
    )
  }
}
