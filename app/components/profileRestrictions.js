import React from 'react';

export default class ProfileRestrictions extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><h4>Eating Restrictions</h4></div>
        <div className="panel-body font1">
          <form role="form">
            <div className="row">
              <div className="col-xs-10 col-xs-offset-1 row">
                <div className="col-xs-6">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Dairy
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Eggs
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Nuts
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Soy
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Gluten
                    </label>
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Fish
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Shellfish
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Poultry
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Beef
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" />Pork
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <button type="submit" className="btn btn-default pull-right">Save</button>
          </form>
        </div>
      </div>
    )
  }
}
