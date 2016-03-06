/* Empty for now. :) */
import React from "react";
import ReactDOM from "react-dom";
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
//import browseFeed.js, navbar.js, filter, etc
//will need a main component for every page
//every page gets its own class here in app.js


/**
 * A fake profile page.
 */
class RecipePage extends React.Component {
  render() {
    return (
      <p>This is our hypothetical recipe page!</p>
    );
  }
}

/**
 * The Browse page assumes that user 1 is logged in.
 * This doesn't matter much for browse though.
 */
class BrowsePage extends React.Component {
  render() {
    return <Browse />
  }
}

/**
 * The primary component in our application.
 * The Router will give it different child Components as the user clicks
 * around the application.
 */
class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={BrowsePage} />
      <Route path="profile/:id" component={ProfilePage} />
    </Route>
  </Router>
),document.getElementById('fb-feed'));



$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
});
