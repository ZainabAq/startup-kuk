import React from 'react';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
              <h1 className="center">Profile</h1>
              <div className="panel panel-default">
                <div classNameName="panel-heading"><h4>Upcoming Meals</h4></div>
                <div className="panel-body font1">
                  <div className="list-group">
                    <div className="list-group-item row">
                      <div className="col-md-8">
                        <h4 className="list-group-item-heading">Monday Breakfast</h4>
                        <a href="#" className="list-group-item-text">Scrambled Tofu</a>
                      </div>
                      <div className="col-md-4">
                        <img src="img/planning-images/scrambled-tofu.jpg" className="img-thumbnail pull-right" />
                      </div>
                    </div>
                    <div className="list-group-item row">
                      <div className="col-md-8">
                        <h4 className="list-group-item-heading">Monday Lunch</h4>
                        <a href="#" className="list-group-item-text">Meatloaf</a>
                      </div>
                      <div className="col-md-4">
                        <img src="img/planning-images/meatloaf.jpg" className="img-thumbnail pull-right" />
                      </div>
                    </div>
                    <div className="list-group-item row">
                      <div className="col-md-8">
                        <h4 className="list-group-item-heading">Monday Dinner</h4>
                        <a href="#" className="list-group-item-text">Chicken Biryani</a>
                      </div>
                      <div className="col-md-4">
                        <img src="img/planning-images/chicken-biryani.jpg" className="img-thumbnail pull-right" />
                      </div>
                    </div>
                    <div className="list-group-item row">
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
              <div className="panel panel-default">
                <div className="panel-heading"><h4>Eating Restrictions</h4></div>
                <div className="panel-body font1">
                  <form role="form">
                    <div className="row">
                      <div className="col-xs-10 col-xs-offset-1 row">
                        <div className="col-xs-6">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Dairy
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Eggs
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Nuts
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Soy
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Gluten
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Fish
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Shellfish
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Poultry
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Beef
                            </label>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />Pork
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <button type="submit" className="btn btn-default pull-right">Save</button>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
