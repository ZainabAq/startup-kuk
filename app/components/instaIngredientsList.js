import React from 'react';
import EnterInstaIngredient from './enterInstaIngredient'
import InstaIngredient from './instaIngredient.js'

export default class InstaIngredientsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div className="instamode">
          <form className="form-wrapper cf">
            < EnterInstaIngredient onPost={this.props.onPost}/>
            <h4> My Ingredients:<span className="glyphicon glyiphicon-remove"></span> </h4>
            <ul className="ingredients-box list-inline">
              {this.props.ingredients.map( ingredient =>
                  <li className="ingredient" key={this.props.ingredients.indexOf(ingredient)}><InstaIngredient ingredient={ingredient} onDelete={(ingredient) => this.props.onDelete(ingredient)}/></li>
              )}
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
