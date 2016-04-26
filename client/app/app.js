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
import ShoppingList from './components/shopping';
import ErrorBanner from './components/errorbanner';
import {ResetDatabase} from './components/resetbutton';
import Shopping from './components/shopping';

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
    return <ResultsFeed query={this.props.location.query} />
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
    return <Favorites user={this.props.params.id}/>
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

/**
* Shopping List page
*/
class ShoppingPage extends React.Component {
   render() {
      return <Shopping user={this.props.params.id} />
   }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="col-md-12">
            <ErrorBanner />
        </div>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

ReactDOM.render((
  <div>
    <Router history={hashHistory}>
      <Route name = "Kuk" path="/" component={App}>
        <IndexRoute component={BrowsePage} />
        <Route path="recipe/:id" component={RecipePage} />
        <Route path="profile/:id" component={ProfilePage} />
        <Route path="results" component={ResultsPage} />
        <Route path="instamode" component={InstaPage} />
        <Route path="favorites/:id" component={FavoritesPage} />
        <Route path="calendar/:id" component={CalendarPage} />
        <Route path="shopping/:id" component={ShoppingPage} />
      </Route>
    </Router>
    <ResetDatabase />
  </div>
),document.getElementById('main-page'));
