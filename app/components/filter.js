//react component for the filter bar
import React from 'react';
import {getRestriction} from '../server';

export default class FilterBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        restrictions: []
      };
    }

  handleFilter(e) {
    e.preventDefault();
    this.props.onFilter(this.state.restrictions);
  }

  handleChange(checkEvent) {
     checkEvent.preventDefault();
    if (checkEvent.target.checked) {
      getRestriction(checkEvent.target, (object) => {
        var newRestrictions = this.state.restrictions.concat(object.restrictions);
        this.setState({restrictions : newRestrictions});
        object.target.checked = true;
      });
     } else {
       getRestriction(checkEvent.target, (object) => {
         object.target.checked = true;
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
                    <input value="1" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Dairy
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="2" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Eggs
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="3" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Nuts
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="4" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Soy
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="5" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Gluten
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="6" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Fish
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="7" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Shellfish
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="8" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Poultry
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="9" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Beef
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input value="10" type="checkbox" onChange={(e) => {
                        this.handleChange(e);
                      }} />Pork
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
