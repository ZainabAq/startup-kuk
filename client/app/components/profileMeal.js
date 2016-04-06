import React from 'react';
import {Link} from 'react-router';

export default class ProfileMeal extends React.Component {
  render() {
    return (
      <div className="list-group-item list-group-item-profile row">
        <div className="col-md-8">
          <h4 className="list-group-item-heading">{this.props.day} {this.props.type}</h4>
          <Link to={"/recipe/" + this.props.data._id} className="list-group-item-text">{this.props.data.name}</Link>
        </div>
        <div className="col-md-4">
          <img src={this.props.data.img} className="img-thumbnail pull-right" />
        </div>
      </div>
    )
  }
}
