import React from 'react';
import {Link} from 'react-router';


export default class CalenderEntry extends React.Component {

  render () {
    return (
      <li>
        <div className="col-md-10 ">
        <Link to={"/recipe/" + this.props.data._id} className="list-group-item-text"><h5 align="center">{this.props.data.name}</h5>
          <img src={this.props.data.img} alt={this.props.data._id} className="img-rounded croppedimg" /></Link>
          </div>
        </li>
  )
}
}
