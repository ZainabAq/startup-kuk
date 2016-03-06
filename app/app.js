/* Empty for now. :) */
import React from "react";
import ReactDOM from "react-dom";
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import BrowseFeed from './components/browseFeed';
import Recipe from './components/recipe';

/**
 * A recipe page
 */
class RecipePage extends React.Component {
  render() {
     console.log("In the recipePage render function");
    return <Recipe />
  }
}

/**
 * The browse page - this is what loads when the user first goes to the site
 */
class BrowsePage extends React.Component {
  render() {
     console.log("In the BrowsePage render")
    return <BrowseFeed />
  }
}

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
      <IndexRoute component={BrowsePage} />
      <Route path="recipe/:id" component={RecipePage} />
    </Route>
  </Router>
),document.getElementById('main-page'));


// ReactDOM.render(
//    <BrowseFeed />,
//    document.getElementById('main-page')
// );


// $(document).ready(function () {
//   var trigger = $('.hamburger'),
//       overlay = $('.overlay'),
//      isClosed = false;
//
//     trigger.click(function () {
//       hamburger_cross();
//     });
//
//     function hamburger_cross() {
//
//       if (isClosed == true) {
//         overlay.hide();
//         trigger.removeClass('is-open');
//         trigger.addClass('is-closed');
//         isClosed = false;
//       } else {
//         overlay.show();
//         trigger.removeClass('is-closed');
//         trigger.addClass('is-open');
//         isClosed = true;
//       }
//   }
//
//   $('[data-toggle="offcanvas"]').click(function () {
//         $('#wrapper').toggleClass('toggled');
//   });
// });
