import React from 'react';
import {Link} from 'react-router';
import Searchbar from './searchbar';
//import {findRecipe} from '../server';
//import ResultsItem from './resultsItem';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: ""
    };
  }

  onSearch(searchText) {
    // If searchText is 'Brownies', navigates to #/results/q?=Brownies
    this.context.router.push({ pathname: "/results", query: { q: searchText } });
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
                <li className="presentation" >
                  <Searchbar type="nav-search" onSearch={(searchText) => {
                    this.onSearch(searchText);
                  }} />
                </li>
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

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};
