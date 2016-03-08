import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

export default class BrowseFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Feed with bunch of recipes, first few?
    };
  }

  // onFilter() {
  //   // refresh page with new collection of recipes
  //   // Database is queried according to user's filters
  //   filterFeed( => {
  //     this.refresh();
  //   })
  // }

  // NOTE:If we wanted to get fancy, we could modify the Feed’s render() function to
  // display a loading animation until the server responds. You could, for example,
  // set the state to { loaded: false; } in the constructor, change render to create
  // the animation when loaded is false, and set loaded to true once the server
  // response comes back in.
  render() {
    return (
      <div>
        <h1 className="center">Browse Our Recipes</h1>
        <ul id="categories" className="clr">
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/432846.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>Baked Chicken</Link></h1>
                <p>
                  <i className="glyphicon glyphicon-time info">15min</i>
                  Roast chicken pieces with sticky, sweet and tangy coating
                </p>
            </div>
          </li>
            <li>
              <div>
                <img src="http://dish.allrecipes.com/wp-content/uploads/2015/04/Poached-Eggs_Eggs-Benedict_Photo-by-Meredith.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>Salmon Bagels</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/2964964.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="img/logo2.png" alt=""/>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/1655056.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/3246513.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li className="pusher"></li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/672001.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/2343032.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/3118122.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/3088926.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li><li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/2333962.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/861374.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/3213063.jpg" alt=""/>
                <h1><Link to={"/recipe/1"}>This is a recipe</Link></h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li className="pusher"></li>
          <li className="pusher"></li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/842371.jpg" alt=""/>
                <h1>This is a recipe</h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li className="pusher"></li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/738814.jpg" alt=""/>
                <h1>This is a recipe</h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/2728664.jpg" alt=""/>
                <h1>This is a recipe</h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
          <li>
              <div>
                <img src="http://images.media-allrecipes.com/userphotos/600x600/1523484.jpg" alt=""/>
                <h1>This is a recipe</h1>
                <p>Some sample text about the recipe this hexagon leads to
                  <i className="glyphicon glyphicon-time info pull-left">15min</i>
                </p>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
