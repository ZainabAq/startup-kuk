import React from 'react';

export default class ProfileMeals extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading panel-heading-profile"><h4>Upcoming Meals</h4></div>
        <div className="panel-body panel-body-profile font1">
          <div className="list-group">
            <div className="list-group-item list-group-item-profile row">
              <div className="col-md-8">
                <h4 className="list-group-item-heading">Monday Breakfast</h4>
                <a href="#" className="list-group-item-text">Scrambled Tofu</a>
              </div>
              <div className="col-md-4">
                <img src="img/planning-images/scrambled-tofu.jpg" className="img-thumbnail pull-right" />
              </div>
            </div>
            <div className="list-group-item list-group-item-profile row">
              <div className="col-md-8">
                <h4 className="list-group-item-heading">Monday Lunch</h4>
                <a href="#" className="list-group-item-text">Meatloaf</a>
              </div>
              <div className="col-md-4">
                <img src="img/planning-images/meatloaf.jpg" className="img-thumbnail pull-right" />
              </div>
            </div>
            <div className="list-group-item list-group-item-profile row">
              <div className="col-md-8">
                <h4 className="list-group-item-heading">Monday Dinner</h4>
                <a href="#" className="list-group-item-text">Chicken Biryani</a>
              </div>
              <div className="col-md-4">
                <img src="img/planning-images/chicken-biryani.jpg" className="img-thumbnail pull-right" />
              </div>
            </div>
            <div className="list-group-item list-group-item-profile row">
              <div className="col-md-8">
                <h4 className="list-group-item-heading">Monday Snack</h4>
                <a href="#" className="list-group-item-text">Homemade Granola</a>
              </div>
              <div className="col-md-4">
                <img src="img/planning-images/homemade-granola.jpg" className="img-thumbnail pull-right" />
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-default pull-right">See More</button>
        </div>
      </div>
    )
  }
}
