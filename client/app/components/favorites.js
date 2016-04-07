import React from 'react';
import {Link} from 'react-router';
import {getProfileData, findRecipesFromId} from '../server';
import FavoritesItem from './favoritesItem';
import FilterBar from './filter';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.user,
      /** filter bar is offscreen by default so its condition is true */
      condition: true,
      /** empty favorites' list initially */
      favoritesList: [],
      /** the list of recipes of the favorited items is initially empty */
      recipeList: [],
      /** the default sort id */
      sortId: 0
    };
  }

  /** handles click of filter button to decide whether or not to show the sidebar */
  handleClick(e){
    e.preventDefault();
    this.setState( { condition : !this.state.condition } );
  }

  handleClick2(e) {
    e.preventDefault();
    this.forceUpdate()
  }

  /** handles click of sort options to determine sorting */
  handleSortNewFirst(e) {
    e.preventDefault();
    this.setState( { sortId : 1 } );
    console.log("inhandle")
    this.refresh(3);
  }

  /** gets the favorites' list for the current user and the recipes of the
  favorited items */
  refresh() {
    getProfileData(this.props.user, (userData) => {
      this.setState({favoritesList : userData.favorites});
      console.log("hereee");
      if (this.state.sortId === 1) {
        console.log(this.state.favoritesList);
        this.setState({favoritesList : this.state.favoritesList.reverse()});
        console.log(this.state.favoritesList);
      }
      console.log("outsideif");
      console.log(this.state.favoritesList);
      findRecipesFromId(this.props.user,this.state.favoritesList, (newRecipeList) => {
        this.setState({recipeList : newRecipeList});
        console.log("outsideif2");
        console.log(this.state.favoritesList);
      });

    });

  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <div id="wrapper" className={this.state.condition ? "toggled" :""}>
          <div id="sidebar-wrapper">
              <FilterBar/>
          </div>
          <div id="page-content-wrapper">
            <div className="favorites">
              <h1 className="center">Favorites</h1>
              <button className="btn btn-default" onClick={(e)=>this.handleClick(e)}>
                <span className="glyphicon glyphicon-filter" color="#337ab7" aria-hidden="true"></span>
                Filter
              </button>
              <div className="pull-right">
                <div className="btn-group">
                  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort <span className="caret"></span></button>
                  <ul className="dropdown-menu pull-right">
                    <li><button onClick={(e)=>this.handleSortNewFirst(e)}>By Date Added - Newest First</button></li>
                    <li role="separator" className="divider"></li>
                    <li><Link to={"/favorites/" + this.props.user}>By Date Added - Oldest First (Default)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="font1">
                  {this.state.recipeList.map((recipe, i) => {
                    return (
                      <FavoritesItem key={i} data={recipe} />
                    );
                  })
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
