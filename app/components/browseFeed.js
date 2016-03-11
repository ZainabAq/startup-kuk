import React from 'react';
import FeedItem from './feeditem';
import FilterBar from './filter';
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
        <div id="wrapper" className="toggled">
          <div id="sidebar-wrapper">
            <FilterBar />
          </div>
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <h1 className="center">Browse Our Recipes</h1>
              <button className="btn btn-default" id="menu-toggle">
                <span className="glyphicon glyphicon-filter" color="#337ab7" aria-hidden="true"></span>
                Filter
              </button>
              <ul id="categories" className="clr">
                {this.state.recipes.map((recipe, i) => {
                  return (
                    <li><FeedItem key={i} info={recipe} /></li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
