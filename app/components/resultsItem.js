import React from 'react';
import {Link} from 'react-router';

export default class ResultsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  render() {
    var data = this.state;
    return (
      <div className="results">
        <div className="panel panel-default result">
          <div className="panel-body">
            <div className="list-group">
              <div className="row">
                <div className="col-md-12">
                  <div className="media">
                  <div className="media-left">
                    <img className="media-object croppedimg img-rounded" src={data.img} />
                  </div>
                  <div className="media-body row">
                    <div className="col-xs-8">
                      <h4 className="media-heading"><Link to={"/recipe/" + data._id}>{data.name}</Link></h4>
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
                         <span> {data.averageRating.length} stars</span>
                      </li>
                      <li className="time-icons">
                          {data.time}&nbsp;
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
    )
  }
}
