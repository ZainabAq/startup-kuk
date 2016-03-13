import React from 'react';
import FeedItem from './feeditem';
import FilterBar from './filter';
import {getFeedData} from '../server';

export default class BrowseFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty Feed initially
      // filter bar is offscreen by default
      condition: true,
      recipes: []
    };
  }

  /** handles click of filter button to decide whether or not to show the sidebar */
  handleClick(e){
    e.preventDefault();
    this.setState( { condition : !this.state.condition } );
  }

  /**
   *  refreshes the feed
   *  populates the feed with a set amount of recipes from the database
   */
  refresh(value) {
    getFeedData(value, (recipeData) => {
      this.setState({recipes : recipeData});
    });
  }

  /**
   *  call refresh when page is loaded to load 5 recipe
   */
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
        <div id="wrapper" className={this.state.condition ? "toggled" :""}>
          <div id="sidebar-wrapper">
              <FilterBar/>
          </div>
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <h1 className="center">Browse Our Recipes</h1>
              <button className="btn btn-default" onClick={(e)=>this.handleClick(e)}>
                <span className="glyphicon glyphicon-filter" color="#337ab7" aria-hidden="true"></span>
                Filter
              </button>
              <ul id="categories" className="clr">
                {this.state.recipes.map((recipe, i) => {
                  return (
                    <li key={i}><FeedItem info={recipe} /></li>
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
