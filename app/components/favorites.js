import React from 'react';
import {getProfileData, findRecipesFromId} from '../server';
import FavoritesItem from './favoritesItem';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesList: [],
      recipeList: []
    };
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
      <div className="favorites">
        <div className="col-md-10">
          <h1 className="center">Favorites</h1>
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
    );
  }
}
