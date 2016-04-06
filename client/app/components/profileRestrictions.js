import React from 'react';
import {removeUserRestriction, addUserRestriction} from '../server';

export default class ProfileRestrictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : this.props.user,
      restrictions : this.props.restrictions,
      checks : this.props.checks
    }
  }

  getChecks() {
    var restrictions = this.state.restrictions;
    var iterable = [1,2,3,4,5,6,7,8,9,10];
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

  handleChange(checkEvent) {
    checkEvent.preventDefault();
    if (checkEvent.target.checked) {
      addUserRestriction(checkEvent.target.value, this.state.user, (restrictions) => {
        var newRestrictions = restrictions;
        this.setState({restrictions : newRestrictions});
        var checks = this.getChecks();
        this.setState({checks : checks});
      });
    } else {
      removeUserRestriction(checkEvent.target.value, this.state.user, (restrictions) => {
        var newRestrictions = restrictions;
        this.setState({restrictions : newRestrictions});
        var checks = this.getChecks();
        this.setState({checks : checks});
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
                        <input value={1} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(1)}
                          checked={this.state.checks[0]} />Dairy
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value={2} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(2)}
                          checked={this.state.checks[1]} />Eggs
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value={3} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(3)}
                          checked={this.state.checks[2]} />Nuts
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value={4} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(4)}
                          checked={this.state.checks[3]} />Soy
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value={5} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(5)}
                          checked={this.state.checks[4]} />Gluten
                      </label>
                    </div>
                  </div>
                  <div className="col-xs-6">
                    <div className="checkbox">
                      <label>
                        <input value={6} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(6)}
                          checked={this.state.checks[5]} />Fish
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value={7} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(7)}
                          checked={this.state.checks[6]} />Shellfish
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value={8} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(8)}
                          checked={this.state.checks[7]} />Poultry
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value={9} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(9)}
                          checked={this.state.checks[8]} />Beef
                      </label>
                    </div>
                    <div className="checkbox">
                      <label>
                        <input value={10} type="checkbox" onChange={(e) => {
                            this.handleChange(e);
                          }} defaultChecked={this.state.restrictions.includes(10)}
                          checked={this.state.checks[9]} />Pork
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
