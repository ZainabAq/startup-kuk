import React from 'react';

export default class Instamode extends React.Component {
  render() {
    return (
      <div>
        <div className="instamode">
          {this.props.children} <a href="#"><span className="glyphicon glyphicon-remove remove-btn navbar-btn"></span></a>
        </div>
      </div>
    );
  }
}
