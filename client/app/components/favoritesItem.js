import React from 'react';
import {Link} from 'react-router';
import {addFavorite, removeFavorite} from '../server';

export default class FavoritesItem extends React.Component {
  constructor(props) {
    super(props);
    /** The favorite item's initial state is favorited */
    this.state = {
       favoriteStatus: true
    };
  }

/** Depending on the item's favorite status, clicking on the button
will result in alternating the item's favorite status. The appropriate
icon will appear depending on the status. */
  handleFavoriteClick(e) {
     e.preventDefault();
     var callbackFunction = () => {};
     if (!this.state.favoriteStatus) {
       /** The addFavorite function adds the current recipe to
       the user's favorites' list. */
           addFavorite(this.props.data._id,  '000000000000000000000001', callbackFunction);
           this.setState({favoriteStatus: true});
        }
        else {
          /* The removeFavorite function removes the current recipe from
          the user's favorites' list. */
           removeFavorite(this.props.data._id, '000000000000000000000001', callbackFunction);
           this.setState({favoriteStatus: false});
        }
  }

  render() {
    var name= this.props.data.name;
    if (name.length > 20) {
      name= name.trim().substring(0, 18)+'...';
    }
    /* sets the appropriate icon to the favorited status */
    var favButtonIcon = "fa fa-heart-o fa-lg";
    if (this.state.favoriteStatus) {
       favButtonIcon = "fa fa-heart fa-lg";
    }
    return (
      <div className="col-md-2 thumbnail">
        <h5 align="center"><Link to={"/recipe/" + this.props.data._id}>{name}</Link></h5>
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
