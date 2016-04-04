import React from 'react';

export default class Instamode extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete(){
    this.props.onDelete(this.props.ingredient);
  }

  render() {
    return (
      <div>
        <div className="instamode">
          {this.props.ingredient} <a onClick={() => this.handleDelete()}><span className="glyphicon glyphicon-remove remove-btn navbar-btn"></span></a>
        </div>
      </div>
    );
  }
}
