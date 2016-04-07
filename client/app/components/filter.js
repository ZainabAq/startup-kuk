import React from 'react';

export default class FilterBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        restrictions: [],
        checks: []
      };
    }

  getChecks() {
    var restrictions = this.state.restrictions;
    // console.log(this.state.restrictions);
    var iterable = [1,2,3,4,5,6,7,8,9,10];
    var booleans = [];
    for (let num of iterable) {
      if (restrictions.includes(num.toString())) {
        booleans.push(true);
      } else {
        booleans.push(false);
      }
    }
    this.setState({checks: booleans});
    return booleans;
  }

  handleFilter(e) {
    e.preventDefault();
    this.props.onFilter(this.state.restrictions);
  }

  handleChange(checkEvent) {
    checkEvent.preventDefault();
    if (checkEvent.target.checked) {
      var newRestrictions = this.state.restrictions.concat(checkEvent.target.value);
      // this.setState({restrictions : newRestrictions};
      this.setState({restrictions : newRestrictions}, function() {
       var checks = this.getChecks();
      //  console.log(checks);
      });
    } else {
      var oldRestrictions = this.state.restrictions;
      var i = oldRestrictions.indexOf(checkEvent.target.value);
      oldRestrictions.splice(i, 1);
      // this.setState({restrictions : oldRestrictions});
      this.setState({restrictions : oldRestrictions}, function() {
       var checks = this.getChecks();
      //  this.setState({checks : checks});
      });
      // checks = this.getChecks();
    }
  }

   render() {
     return(
      <div>
      <div className="panel panel-default">
        <div className="panel-heading sidebar-brand"><h4>Dietary<br /> Restrictions</h4></div>
        <div className="panel-body font1">
          <form role="form">
            <div className="row">
             <div className="col-xs-10 col-xs-offset-1 row">
                <div className="checkbox">
                  <label>
                    <input value={1} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[0]} />Dairy
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={2} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[1]} />Eggs
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={3} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[2]} />Nuts
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={4} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[3]} />Soy
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={5} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[4]} />Gluten
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={6} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[5]} />Fish
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={7} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[6]} />Shellfish
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={8} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[7]} />Poultry
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={9} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[8]} />Beef
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value={10} type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} checked={this.state.checks[9]} />Pork
                  </label>
                </div>
             </div>
            </div>
            <hr />
            <button className="btn btn-default pull-right" onClick={(e) => this.handleFilter(e)}>
              Apply Filter
            </button>
          </form>
      </div>
  </div>
  </div>
);
   }

}
