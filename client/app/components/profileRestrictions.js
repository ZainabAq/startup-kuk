import React from 'react';
import {removeUserRestriction, addUserRestriction} from '../server';

export default class ProfileRestrictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : this.props.user,
      restrictions : this.props.restrictions
    }
  }

  handleChange(checkEvent) {
    checkEvent.preventDefault();
    if (checkEvent.target.checked) {
      addUserRestriction(checkEvent.target, this.state.user, (object) => {
        var newRestrictions = object.restrictions;
        this.setState({restrictions : newRestrictions});
        object.target.checked = true;
      });
    } else {
      removeUserRestriction(checkEvent.target, this.state.user, (object) => {
        var newRestrictions = object.restrictions;
        this.setState({restrictions : newRestrictions});
        object.target.checked = false;
      });
    }
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading panel-heading-profile"><h4>Eating Restrictions</h4></div>
        <div className="panel-body panel-body-profile font1">
          <form role="form">
            <div className="row">
              <div className="col-xs-10 col-xs-offset-1">
                <div className="row">
                  <div className="col-xs-6">
                    <div className="checkbox">
                      <label>
                        <input value="1" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("1")} />Dairy
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value="2" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("2")} />Eggs
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value="3" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("3")} />Nuts
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value="4" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("4")} />Soy
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value="5" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("5")} />Gluten
                      </label>
                    </div>
                  </div>
                  <div className="col-xs-6">
                    <div className="checkbox">
                      <label>
                        <input value="6" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("6")} />Fish
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value="7" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("7")} />Shellfish
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value="8" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("8")} />Poultry
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value="9" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("9")} />Beef
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value="10" type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes("10")} />Pork
                      </label>
                    </div>
                  </div>
              </div>
            </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
