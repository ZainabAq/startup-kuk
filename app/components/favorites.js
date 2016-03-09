import React from 'react';
import {getProfileData, findRecipesFromId} from '../server';

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
        console.log(this.state.recipeList);
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
          <div className="row font1">
            <div className="col-md-2">
              <a href="#" className="thumbnail">
                <h5 align="center">Fried Rice</h5>
                <img src="http://cookdiary.net/wp-content/uploads/images/Chicken-Fried-Rice_16905.jpg" alt="Fried Rice" className="img-rounded croppedimg" />
              </a>
            </div>
            <div className="col-md-2">
              <a href="#" className="thumbnail">
                <h5 align="center">Eggs and Bacon</h5>
                <img src="http://hoosieragtoday.com.s3.amazonaws.com/wp-content/uploads/2015/10/bacon-and-eggs.jpg" alt="Eggs and Bacon" className="img-rounded croppedimg" />
              </a>
            </div>
            <div className="col-md-2">
              <a href="#" className="thumbnail">
                <h5 align="center">Roast Beef</h5>
                <img src="http://www.simplyrecipes.com/wp-content/uploads/2014/11/roast-beef-horiz-a-1200.jpg" alt="Roast Beef" className="img-rounded croppedimg" />
              </a>
            </div>
            <div className="col-md-2">
              <a href="#" className="thumbnail">
                <h5 align="center">Mug Cake</h5>
                <img src="https://cdn2.hubspot.net/hub/293166/file-376074849-jpg/images/mug_cake-resized-600.jpg" alt="Mug Cake" className="img-rounded croppedimg" />
              </a>
            </div>
            <div className="col-md-2">
              <a href="#" className="thumbnail">
                <h5 align="center">Pumpkin Ravioli</h5>
                <img src="http://a.dilcdn.com/bl/wp-content/uploads/sites/8/2010/10/Ravioli-w-Brown-Butter-Sage-Sauce-iStock1.jpg" alt="Pumpkin Ravioli" className="img-rounded croppedimg" />
              </a>
            </div>
          </div>
          <div className="row font1">
            <div className="col-md-2">
              <a href="#" className="thumbnail">
                <h5 align="center">Smoothie and Bagel</h5>
                <img src="img/planning-images/bagel-smoothie.jpg" alt="Smoothie and Bagel" className="img-rounded croppedimg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
