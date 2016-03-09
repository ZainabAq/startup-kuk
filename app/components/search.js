import React from 'react';
import {Link} from 'react-router';

export default class Search extends React.Component {

  render() {
    return (
      <Link to={"/search?q="}></Link>
    )
  }

}
