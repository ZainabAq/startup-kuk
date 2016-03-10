import React from 'react';
import {Link} from 'react-router';


export default class CalenderEntry extends React.Component {

  render () {
    return (
      <li>
        <div className="col-md-10 ">
        <h5 align="center"><Link to={"/recipe/" + this.props.data._id} className="list-group-item-text">{this.props.data.name}</Link></h5>
          <img src={this.props.data.img} alt={this.props.data._id} className="img-rounded croppedimg" />
          </div>
        </li>
  )
}
}
