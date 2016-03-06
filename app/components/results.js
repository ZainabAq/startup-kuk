import React from 'react';
import ReactDOM from 'react-dom';

export default class Results extends React.Component {
  render() {
    return (
      <div>
      // Search bar
      <form className="large-search" role="search">
        <div className="input-group">
          <input type="text" className="form-control kuk-search" value="Molten Lava Cake" placeholder="Search Kuk" />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </form>

      <div className="panel panel-default result">
        <div className="panel-body">
          <div className="list-group">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="media">
                <div className="media-left">
                  <img className="media-object img-thumbnail" src="img/lavaCake.jpg" />
                </div>
                <div className="media-body row">
                  <div className="col-xs-8">
                    <h4 className="media-heading"><a href="#">Molten Lava Cake</a></h4>
                  </div>
                  <div className="col-xs-4">
                     <ul className="list-inline pull-right">
                       <li className="presentation">
                          <span className="fa fa-heart fa-lg social-but"></span>
                       </li>
                       <li className="presentation">
                          <span className="fa fa-calendar-check-o fa-lg social-but"></span>
                       </li>
                       <li className="presentation">
                          <span className="fa fa-share-square fa-lg social-but"></span>
                       </li>
                     </ul>
                  </div>
                  <ul className="list-inline">
                    <li className="rating">
                       <span className="fa fa-star"></span>
                       <span className="fa fa-star"></span>
                       <span className="fa fa-star"></span>
                       <span className="fa fa-star"></span>
                       <span className="fa fa-star"></span>
                    </li>
                    <li className="time-icons">
                        1.5 Hours
                       <span className="fa fa-clock-o"></span>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
