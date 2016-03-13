import React from 'react';
import {Link} from 'react-router';


export default class CalenderEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      remove : false
    }
  }

onRemove(e, id) {
  this.props.onRemove(e, id);
  this.setState({remove : true});
}

  render () {
    if (this.state.remove === false) {
            return (
        <li>
          <div className="col-md-10 ">
            <h5 className="list-group-item-heading text-center">{this.props.type}</h5>
            <Link to={"/recipe/" + this.props.data._id} className="list-group-item-text"><h6 className="text-center font1">{this.props.data.name}</h6>
            <img src={this.props.data.img} alt={this.props.data._id} className="img-rounded croppedimg" /></Link>
            <button className="btn-sm btn-transparent" type="button" onClick={(e) =>this.onRemove(e, this.props.data._id)}><span className="glyphicon glyphicon-remove onImage"></span></button>
            </div>
          </li>
        )
      }
      else {
        return (
          <li>
          <div className="col-md-10 ">
        <h5>Please add a recipe!</h5>
      </div>
    </li>
        )
      }
}
}
