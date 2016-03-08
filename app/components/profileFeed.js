import React from 'react';
import ProfileMeal from './profileMeal';
import ProfileRestrictions from './profileRestrictions';
import {getProfileData} from '../server';

export default class ProfileFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingMeals : []
    }
  }

  refresh() {
    getProfileData(this.props.user, (profileData) => {
      this.setState(profileData);
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

  render() {
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
                      // i is the index (?)
                      return (
                        <ProfileMeal key={i} data={meal} day="Monday" type={this.checkMealType(i)} />
                      )
                    })}
                  </div>
                  <button type="button" className="btn btn-default pull-right">See More</button>
                </div>
              </div>

              <ProfileRestrictions />
          </div>
        </div>
      </div>
    )
  }
}
