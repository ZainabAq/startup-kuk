import React from 'react';

export default class Instamode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="instamode">
          {this.props.ingredient} <a href="#"><span className="glyphicon glyphicon-remove remove-btn navbar-btn"></span></a>
        </div>
      </div>
    );
  }
}
