import React from 'react';

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restrictions: this.props.restrictions,
      checks: []
    };
    this.props.onFilter(this.state.restrictions);
  }

  getChecks() {
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
    setTimeout(() => {
      this.setState({checks: booleans});
    }, 4);
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
       this.getChecks();
      });
    } else {
      var oldRestrictions = this.state.restrictions;
      var i = oldRestrictions.indexOf(checkEvent.target.value);
      oldRestrictions.splice(i, 1);
      // this.setState({restrictions : oldRestrictions});
      this.setState({restrictions : oldRestrictions}, function() {
       this.getChecks();
      });
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
                   <input value="000000000000000000000001" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000001")}
                     checked={this.state.checks[0]} />Dairy
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000002" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000002")}
                     checked={this.state.checks[1]} />Eggs
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000003" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000003")}
                     checked={this.state.checks[2]} />Nuts
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000004" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000004")}
                     checked={this.state.checks[3]} />Soy
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000005" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000005")}
                     checked={this.state.checks[4]} />Gluten
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000006" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000006")}
                     checked={this.state.checks[5]} />Fish
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000007" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000007")}
                     checked={this.state.checks[6]} />Shellfish
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000008" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000008")}
                     checked={this.state.checks[7]} />Poultry
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000009" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000009")}
                     checked={this.state.checks[8]} />Beef
                 </label>
               </div>
               <div className="checkbox">
                 <label>
                   <input value="000000000000000000000010" type="checkbox" onChange={(e) => {
                       this.handleChange(e);
                     }} defaultChecked={this.state.restrictions.includes("000000000000000000000010")}
                     checked={this.state.checks[9]} />Pork
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
