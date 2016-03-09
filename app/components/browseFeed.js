import React from 'react';
import ReactDOM from 'react-dom';
import FeedItem from './feeditem';
import FilterBar from './filter';
import {Link} from 'react-router';
import {getFeedData} from '../server';

export default class BrowseFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty Feed initially
      recipes: []
    };
  }

  /**
   *  refreshes the feed
   *  populates the feed with first 5 recipes from the database
   */
  refresh(value) {
    getFeedData(value, (recipeData) => {
      this.setState({recipes : recipeData});
    });
  }

  // onFilter() {
  //   // Send to server.
  //   // refresh page with new collection of recipes
  //   // Database is queried according to user's filters
  //   filterFeed( => {
  //     // refresh Feed
  //     this.refresh();
  //   })
  // }

  componentDidMount() {
    this.refresh("5");
  }

  // NOTE:If we wanted to get fancy, we could modify the Feed’s render() function to
  // display a loading animation until the server responds. You could, for example,
  // set the state to { loaded: false; } in the constructor, change render to create
  // the animation when loaded is false, and set loaded to true once the server
  // response comes back in.
  render() {
    return (
      <div>
        // <div className="col-md-2"><FilterBar /></div>
        <h1 className="center">Browse Our Recipes</h1>
        <ul id="categories" className="clr">
          {this.state.recipes.map((recipe, i) => {
            return (
              <li><FeedItem info={recipe} /></li>
            )
          })}
        </ul>
      </div>
    )
  }
}
