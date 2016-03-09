import React from 'react';

export default class Instamode extends React.Component {

  // handleChange(e) {
  //   this.setState({ value: e.target.value });
  // }
  //
  // handleKeyUp(e) {
  //   if (e.key === "Enter") {
  //     var comment = this.state.value.trim();
  //     if (comment !== "") {
  //       // post comment
  //       this.props.onPost(this.state.value);
  //       this.setState({ value: "" });
  //     }
  //   }
  // }

  // value={this.state.value} onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}

  render() {
    return (
      <div>
        <div className="instamode">
          <div className="container">
            <div className="row container-row">
              <div className="col-md-4">
              </div>
              <div className="col-md-10 main-content pull-right">
                <h1>Instant Recipes <img src="img/logo.png" id="logo2" /></h1>
                <div className="description">
                  Looking for a recipe, but don't want to run to the grocery store? Enter in your ingredients down below, and kuk will help you find a recipe that best fits your needs!
                </div>
                <form className="form-wrapper cf">
                  <div className="row ingredients-search">
                    <input className="enter-ingredients" type="text" placeholder="What ingredients do you have?" />
                  </div>
                  <h4> My Ingredients:<span className="glyphicon glyiphicon-remove"></span> </h4>
                  <ul className="ingredients-box list-inline">

                  </ul>
                  <button type="submit" className="findrecipe-btn">Find a Recipe! </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
