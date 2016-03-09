import React from 'react';
import EnterInstaIngredient from './enterInstaIngredient'

export default class InstaIngredientsList extends React.Component {

  render() {
    return(
      <div>
        <div className="instamode">
          <form className="form-wrapper cf">
            < EnterInstaIngredient />
            <h4> My Ingredients:<span className="glyphicon glyiphicon-remove"></span> </h4>
            <ul className="ingredients-box list-inline">
              {React.Children.map(this.props.children, function(child) {
                return (
                  <li className="ingredient">{child}</li>
                )
              })}
            </ul>
            <button type="submit" className="findrecipe-btn">Find a Recipe! </button>
          </form>
        </div>
      </div>
    );
  }
}

<ul className="media-list">
</ul>
