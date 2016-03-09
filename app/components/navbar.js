import React from 'react';
import {Link} from 'react-router';
import Searchbar from './searchbar';

export default class Navbar extends React.Component {
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
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
                <img src="img/Kuk-logo.png" id="logo" />
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-left nav-pills">
                <li className="presentation">
                  <Link to={"/"}><span className="glyphicon glyphicon-cutlery"></span> Browse</Link>
                </li>
                <li className="presentation">
                  <Link to={"/instamode"}><span className="glyphicon glyphicon-fire"></span> Insta-Recipe</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right" role="search">
                <li className="presentation"><form className="navbar-form" role="search">
                  <div className="input-group">
                    <input type="text" className="form-control kuk-search" placeholder="Search Kuk"
                      value={this.state.value} onChange={(e) => this.handleChange(e)}
                      onKeyUp={(e) => this.handleKeyUp(e)} />
                    <span className="input-group-btn">
                      <button type="submit" className="btn btn-default" onClick={(e) => this.handleClick(e)}>
                        <span className="glyphicon glyphicon-search"></span>
                      </button>
                    </span>
                  </div>
                </form></li>
                <li className="presentation"><div className="btn-group"><button type="button"
                  className="btn btn-default navbar-btn dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  PIC
                </button>
                <ul className="dropdown-menu">
                  <li><Link to={"/profile/1"}>Profile</Link></li>
                  <li><Link to="/favorites/1">Favorites</Link></li>
                  <li><Link to="/calendar/1">Calendar</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Log out</a></li>
                </ul></div></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
