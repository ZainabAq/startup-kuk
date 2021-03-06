import React from 'react';
import ProfileMeal from './profileMeal';
import ProfileRestrictions from './profileRestrictions';
import {getProfileData} from '../server';
import {Link} from 'react-router';

export default class ProfileFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id : this.props.user,
      upcomingMeals : [],
      loading : true
    }
  }

  refresh() {
    getProfileData(this.props.user, (profileData) => {
      this.setState(profileData);
      this.setState({loading : false});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  checkMealType(i) {
    if (i === 0){
      return "Breakfast";
    } else if (i === 1) {
      return "Lunch";
    } else if (i === 3) {
      return "Dinner";
    } else {
      return "Snack";
    }
  }

  getRestrictionChecks() {
    var restrictions = this.state.restrictions;
    var iterable = [
      "000000000000000000000001",
      "000000000000000000000002",
      "000000000000000000000003",
      "000000000000000000000004",
      "000000000000000000000005",
      "000000000000000000000006",
      "000000000000000000000007",
      "000000000000000000000008",
      "000000000000000000000009",
      "000000000000000000000010"
    ];
    var booleans = [];
    for (let num of iterable) {
      if (restrictions.includes(num)) {
        booleans.push(true);
      } else {
        booleans.push(false);
      }
    }
    return booleans;
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h1 className="center">Profile</h1>

              <div className="panel panel-default">
                <div className="panel-heading panel-heading-profile"><h4>Upcoming Meals</h4></div>
                <div className="panel-body panel-body-profile font1">
                  <div className="list-group">
                    {this.state.upcomingMeals.map((meal, i) => {
                      // i is the index
                      return (
                        <ProfileMeal key={i} data={meal} day="Monday" type={this.checkMealType(i)} />
                      )
                    })}
                  </div>
                  <button type="button" className="btn btn-default pull-right">See More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <h1 className="center">Profile</h1>

                <div className="panel panel-default">
                  <div className="panel-heading panel-heading-profile"><h4>Upcoming Meals</h4></div>
                  <div className="panel-body panel-body-profile font1">
                    <div className="list-group">
                      {this.state.upcomingMeals.map((meal, i) => {
                        // i is the index
                        return (
                          <ProfileMeal key={i} data={meal} day="Monday" type={this.checkMealType(i)} />
                        )
                      })}
                    </div>
                    <Link to={"/calendar/" + this.props.user}><button type="button" className="btn btn-default pull-right">
                      See More
                    </button></Link>
                  </div>
                </div>

                <ProfileRestrictions user={this.state._id} restrictions={this.state.restrictions} checks={this.getRestrictionChecks()} />
            </div>
          </div>
        </div>
      )
    }
  }
}
