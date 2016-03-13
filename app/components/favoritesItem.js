import React from 'react';
import {Link} from 'react-router';
import {addFavorite, removeFavorite} from '../server';

export default class FavoritesItem extends React.Component {
  constructor(props) {
    super(props);
    // The favorite item's initial state
    this.state = {
       favoriteStatus: true
    };
  }

  handleFavoriteClick(e) {
     e.preventDefault();
     var callbackFunction = () => {};
     if (!this.state.favoriteStatus) {
           addFavorite(this.props.data._id, 1, callbackFunction);
           this.setState({favoriteStatus: true});
        }
        else {
           removeFavorite(this.props.data._id, 1, callbackFunction);
           this.setState({favoriteStatus: false});
        }
  }

  render() {
    var favButtonIcon = "fa fa-heart fa-lg";
    if (this.state.favoriteStatus) {
       favButtonIcon = "fa fa-times fa-lg";
    }
    return (
      <div className="col-md-2 thumbnail">
        <h5 align="center"><Link to={"/recipe/" + this.props.data._id}>{this.props.data.name}</Link></h5>
        <div className="imagespace">
        <img src={this.props.data.img} alt={this.props.data._id} className="img-rounded croppedimg" />
          <div className="heartspace">
            <a className="mini-listing red button" href="#" onClick={(e)=>this.handleFavoriteClick(e)}><span className={favButtonIcon}></span></a>
          </div>
        </div>
      </div>
    );
  }
}
