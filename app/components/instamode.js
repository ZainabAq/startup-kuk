import React from 'react';

export default class Instamode extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row container-row">
            <div className="col-md-4">
              // left-sidebar
            </div>
            <div className="col-md-10 main-content pull-right">
              <h1>Instant Recipes <img src="img/logo.png" id="logo2" /></h1>
              <div className="description">
                Looking for a recipe, but don&quot;t want to run to the grocery store? Enter in your ingredients down below, and kuk will help you find a recipe that best fits your needs!
              </div>
              <form className="form-wrapper cf">
                <div className="row ingredients-search">
                  <input className="enter-ingredients" type="text" placeholder="What ingredients do you have?" required />
                </div>
                <h4> My Ingredients:<span className="glyphicon glyiphicon-remove"></span> </h4>
                <ul className="ingredients-box list-inline">
                  <li className="ingredient">Vegtable Oil <a href="#"><span className="glyphicon glyphicon-remove remove-btn navbar-btn"></span></a> </li>
                  <li className="ingredient">Noodles <a href="#"><span className="glyphicon glyphicon-remove remove-btn navbar-btn"></span></a></li>
                  <li className="ingredient">Broccoli <a href="#"><span className="glyphicon glyphicon-remove remove-btn navbar-btn"></span></a></li>
                  <li className="ingredient">Eggs <a href="#"><span className="glyphicon glyphicon-remove remove-btn navbar-btn"></span></a></li>
                  <li className="ingredient">Scallop Onions <a href="#"><span className="glyphicon glyphicon-remove remove-btn navbar-btn"></span></a></li>
                </ul>
                <button type="submit" className="findrecipe-btn">Find a Recipe! </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
