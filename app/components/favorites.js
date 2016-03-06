import React from 'react';

export default class Favorites extends React.Component {
  render() {
    return (
      <div className="col-md-10">
        <h1 className="center">Favorites</h1>
        <div align="right">
          <div className="btn-group">
            <button type="button" className="btn btn-default dropdown-toggle font1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a href="#">By Cuisine</a></li>
              <li><a href="#">By Meal</a></li>
              <li><a href="#">By Calories (Lowest to Highest)</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="#">By Date Added</a></li>
            </ul>
          </div>
        </div>
        <div className="row font1">
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Fried Rice</h5>
              <img src="img/planning-images/fried-rice.jpg" alt="Fried Rice" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Eggs and Bacon</h5>
              <img src="img/planning-images/eggs-bacon.jpg" alt="Eggs and Bacon" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Roast Beef</h5>
              <img src="img/planning-images/roast-beef.jpg" alt="Roast Beef" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Mug Cake</h5>
              <img src="img/planning-images/mug-cake.jpg" alt="Mug Cake" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Pumpkin Ravioli</h5>
              <img src="img/planning-images/pumpkin-ravioli.jpg" alt="Pumpkin Ravioli" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
        </div>
        <div className="row font1">
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Smoothie and Bagel</h5>
              <img src="img/planning-images/bagel-smoothie.jpg" alt="Smoothie and Bagel" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Frozen Yogurt</h5>
              <img src="img/planning-images/frozen-yogurt.jpg" alt="Frozen Yogurt" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Garden Burger</h5>
              <img src="img/planning-images/garden-burger.jpg" alt="Garden Burger" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
          <div className="col-md-2">
            <a href="#" className="thumbnail">
              <h5 align="center">Thai Curry</h5>
              <img src="img/planning-images/thai-curry.jpg" alt="Thai Curry" style="width:160px;height:120px" className="img-rounded" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
