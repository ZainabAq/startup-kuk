import React from 'react';
import {Link} from 'react-router';

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    // The FeedItem's initial state is what the Feed passes to us.
    this.state = props.data;
  }

  render() {
    var data = this.props.data;
    var title = data.name;
    if (title.length > 23) {
      title = title.trim().substring(0, 23)+'...';
    }
    return (
      <div>
        <img src={data.img} alt=""/>
        <h1><Link to={"/recipe/" + data._id}>{title}</Link></h1>
        <p>
          <i className="glyphicon glyphicon-time info">{data.time}</i>
          {data.description}
        </p>
      </div>
    )
  }
}
