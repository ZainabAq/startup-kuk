import React from 'react';

/** Search bar that shows up on results page */
export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  onSearch() {
    var trimmedTerm = this.state.value.trim();
    if (trimmedTerm !== "") {
      // If searchText is 'Brownies', navigates to #/results/q?=Brownies
      this.context.router.push({ pathname: "/results", query: { q: trimmedTerm } });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key == "Enter") {
      this.onSearch();
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.onSearch();
  }

  componentWillReceiveProps(nextProps) {
    //console.log("ugh")
    this.setState({
      value : nextProps.value
    });
  }

  render() {
    return (
      <form onSubmit={(evt) => evt.preventDefault()} className="navbar-form" role="search">
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
    )
  }
}

Searchbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};
