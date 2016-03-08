import React from 'react';
import ProfileMeals from './profileMeals';
import ProfileRestrictions from './profileRestrictions';
import {getProfileData} from '../server';

export default class ProfileFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  refresh() {
    getProfileData(this.props.user, (profileData) => {
      this.setState(profileData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
              <h1 className="center">Profile</h1>
              <ProfileMeals />
              <ProfileRestrictions />
          </div>
        </div>
      </div>
    )
  }
}
