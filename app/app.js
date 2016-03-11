import React from "react";
import ReactDOM from "react-dom";
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import BrowseFeed from './components/browseFeed';
import Recipe from './components/recipe';
import ProfileFeed from './components/profileFeed';
import ResultsFeed from './components/resultsFeed';
import Instamode from './components/instamode';
import Favorites from './components/favorites';
import Calendar from './components/calendar';
import Navbar from './components/navbar';
import FilterBar from './components/filter';

/**
 * A recipe page
 */
class RecipePage extends React.Component {
  render() {
     return <Recipe param={this.props.params.id} />
  }
}

/**
 * The browse page - this is what loads when the user first goes to the site
 */
class BrowsePage extends React.Component {
  render() {
    return <BrowseFeed />
  }
}

/**
 * The profile page
 */
class ProfilePage extends React.Component {
  render() {
    return <ProfileFeed user={this.props.params.id} />
  }
}

/**
 * The results page
 */
class ResultsPage extends React.Component {
  render() {
    return (
      <div className="padThai">
        <div className="col-md-offset-1 col-md-2"><FilterBar /></div>
        <div className="col-md-8"><ResultsFeed /></div>
      </div>

    )
  }
}

/**
 * The instamode page
 */
class InstaPage extends React.Component {
  render() {
    return <Instamode />
  }
}

/**
 * Favorites page
 */
class FavoritesPage extends React.Component {
  render() {
    return (
      <div>
        <div className="col-md-2"><FilterBar /></div>
        <div><Favorites /></div>
      </div>

      )
  }
}

/**
 * Calendar page
 */
class CalendarPage extends React.Component {
  render() {
    return <Calendar user={this.props.params.id} />
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>{this.props.children}</div>
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BrowsePage} />
      <Route path="recipe/:id" component={RecipePage} />
      <Route path="profile/:id" component={ProfilePage} />
      <Route path="results" component={ResultsPage} />
      <Route path="instamode" component={InstaPage} />
      <Route path="favorites/:id" component={FavoritesPage} />
      <Route path="calendar/:id" component={CalendarPage} />
    </Route>
  </Router>
),document.getElementById('main-page'));
