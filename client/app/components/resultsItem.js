import React from 'react';
import {Link} from 'react-router';

export default class ResultsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  findAverageRating() {
     var ratings = this.state.averageRating;
     var sum = 0;
     for( var i = 0; i < ratings.length; i++ ){
        sum += parseInt(ratings[i], 10 );
     }
     var average = Math.floor(sum/ratings.length);
     return average;
  }

  render() {
    return (
      <div className="results">
        <div className="panel panel-default result">
          <div className="panel-body">
            <div className="list-group">
              <div className="row">
                <div className="col-md-12">
                  <div className="media">
                  <div className="media-left">
                    <img className="media-object croppedimg img-rounded" src={this.state.img} />
                  </div>
                  <div className="media-body row">
                    <div className="col-xs-8">
                      <h4 className="media-heading"><Link to={"/recipe/" + this.state._id}>{this.state.name}</Link></h4>
                    </div>
                    <div className="col-xs-4">
                       <ul className="list-inline pull-right">
                         <li className="presentation">

                         </li>
                         <li className="presentation">

                         </li>
                         <li className="presentation">

                         </li>
                       </ul>
                    </div>
                    <ul className="list-inline">
                      <li className="rating">
                        {(() => {
                           var elements=[];
                           for (var i=0; i<this.findAverageRating(); i++) {
                              elements.push(<span key={i} className="fa fa-star fa-lg"></span>)
                           }
                           return elements;
                        })()}
                        {(() => {
                           var secondElements=[];
                           var lessFive = 5-this.findAverageRating();
                           for (var i=0; i<lessFive; i++) {
                              secondElements.push(<span key={i} className="fa fa-star-o fa-lg"></span>)
                           }
                           return secondElements;
                        })()}
                      </li>
                      <li className="time-icons">
                         <span className="fa fa-clock-o fa-lg"></span>
                         &nbsp;{this.state.time}
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
