import React from 'react';
import {getProfileData, findRecipesFromId} from '../server';
import FavoritesItem from './favoritesItem';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesList: [],
      recipeList: [],
      condition: true
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({condition: !this.state.condition});
  }

  refresh() {
    getProfileData("1", (newFavoritesList) => {
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
      <div className="favorites" id="wrapper">
        <div id="page-content-wrapper">
          <h1 className="center">Favorites</h1>
          <div>
              <button className="btn btn-default pull-left" id="menu-toggle" onClick={(e)=>this.handleClick(e)}>
                <span className="glyphicon glyphicon-filter" color="#337ab7" aria-hidden="true"></span>
                Filter
              </button>
              <div className="btn-group sortbuttonspace">
              <button type="button" className="btn btn-default dropdown-toggle sortbutton pull-right" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort <span className="caret"></span>
                </button>
              <ul className="dropdown-menu pull-right">
                <li><a href="#">By Cuisine</a></li>
                <li><a href="#">By Meal</a></li>
                <li><a href="#">By Calories: Low to High</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">By Date Added</a></li>
              </ul>
            </div>
          <div className="container-fluid" id="favoriteslisting">
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
    );
  }
}
