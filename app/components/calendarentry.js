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
      console.log(this.state.remove);
      return (
        <li>
          <div className="col-md-10 ">
            <Link to={"/recipe/" + this.props.data._id} className="list-group-item-text"><h5 align="center">{this.props.data.name}</h5>
            <img src={this.props.data.img} alt={this.props.data._id} className="img-rounded croppedimg" /></Link>
            <button className="btn btn-info" type="button" onClick={(e) =>this.onRemove(e, this.props.data._id)}><span className="glyphicon glyphicon-remove"></span></button>
            </div>
          </li>
        )
      }
      else {
        return (
        <h5>Please add a recipe!</h5>
        )
      }
}
}
