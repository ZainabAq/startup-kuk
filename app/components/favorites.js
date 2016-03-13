import React from 'react';
import {getProfileData, findRecipesFromId} from '../server';
import FavoritesItem from './favoritesItem';
import FilterBar from './filter';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id : this.props.user,
      /** filter bar is offscreen by default so its condition is true */
      condition: true,
      /** empty favorites' list initially */
      favoritesList: [],
      /** the list of recipes of the favorited items is initially empty */
      recipeList: []
    };
  }

  /** handles click of filter button to decide whether or not to show the sidebar */
  handleClick(e){
    e.preventDefault();
    this.setState( { condition : !this.state.condition } );
  }

  /** gets the favorites' list for the current user and the recipes of the
  favorited items */
  refresh() {
    getProfileData(this.props.user, (newFavoritesList) => {
      this.setState({favoritesList : newFavoritesList.favorites});
      findRecipesFromId(this.state.favoritesList, (newRecipeList) => {
        this.setState({recipeList : newRecipeList});
      });

    });

  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div id="wrapper" className={this.state.condition ? "toggled" :""}>
          <div id="sidebar-wrapper">
              <FilterBar/>
          </div>
          <div id="page-content-wrapper">
            <div className="favorites">
              <h1 className="center">Favorites</h1>
              <button className="btn btn-default" onClick={(e)=>this.handleClick(e)}>
                <span className="glyphicon glyphicon-filter" color="#337ab7" aria-hidden="true"></span>
                Filter
              </button>
              <div className="pull-right">
                <div className="btn-group">
                  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort <span className="caret"></span></button>
                  <ul className="dropdown-menu pull-right">
                    <li><a href="#">By Cuisine</a></li>
                    <li><a href="#">By Meal</a></li>
                    <li><a href="#">By Calories: Low to High</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">By Date Added</a></li>
                  </ul>
                </div>
              </div>
              <div className="font1">
                  {this.state.recipeList.map((recipe, i) => {
                    return (
                      <FavoritesItem key={i} data={recipe} />
                    );
                  })
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
