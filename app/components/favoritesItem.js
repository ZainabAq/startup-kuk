import React from 'react';
import {Link} from 'react-router';

export default class FavoritesItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-2 thumbnail">
        <h5 align="center"><Link to={"/recipe/" + this.props.data._id}>{this.props.data.name}</Link></h5>
        <img src={this.props.data.img} alt={this.props.data._id} className="img-rounded croppedimg" />
      </div>
    );
  }
}
