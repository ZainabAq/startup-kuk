import React from 'react';

/** Search bar that shows up on results page */
export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      value: this.props.value
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
        this.setState({value: this.state.value});
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    var search = this.state.value.trim();
    if (search !== "") {
      // Search keyword
      this.props.onSearch(this.state.value);
      this.setState({value: this.state.value});
    }
  }

  componentWillReceiveProps(nextProps) {
    //console.log("ugh")
    this.setState({
      value : nextProps.value
    });
  }

  render() {
    if (this.state.type == "resultsPage") {
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
    } else if (this.state.type == "nav-search") {
      return (
        <form className="navbar-form" role="search">
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
}
