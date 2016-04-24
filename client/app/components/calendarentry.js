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
    var name= this.props.data.name;
    if (name.length > 23) {
      name= name.trim().substring(0, 20)+'...';
    }
    if (this.state.remove === false) {
            return (
        <li>
          <div className="col-md-10 ">
            <Link to={"/recipe/" + this.props.data._id} className="list-group-item-text"><h6 className="text-center font1">{name}</h6>
            <img src={this.props.data.img} alt={this.props.data._id} className="img-rounded croppedimg" /></Link>
            <button className="btn-sm btn-transparent" type="button" onClick={(e) =>this.onRemove(e)}><span className="glyphicon glyphicon-remove onImage"></span></button>
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
