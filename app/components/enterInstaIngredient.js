import React from 'react';

export default class EnterInstaIngredient extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value = ''
  //   };
  // }
  //
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
          <div className="row ingredients-search">
            <input className="enter-ingredients" type="text" placeholder="What ingredients do you have?"/>
          </div>
        </div>
      </div>
    );
  }
}
