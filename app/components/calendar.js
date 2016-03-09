import React from 'react';
import CalendarEntry from './calendarentry';
import {getProfileCalendarData} from '../server';

//import {Link} from 'react-router';


export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id : this.props.user,
      loading : true,
      week: 1,
      Monday : [],
      Tuesday: []
    }
  }
    refresh() {
       getProfileCalendarData(this.props.user, (profileData) => {
         this.setState(profileData);
       });
    }

    onEdit() {

    }

    onPreviousWeek() {

    }

    onNextWeek() {

    }

    checkMealType(i) {
      if (i === 0){
        return "Breakfast";
      } else if (i === 1) {
        return "Lunch";
      } else if (i === 3) {
        return "Dinner";
      } else {
        return "Snack";
      }
    }

    componentDidMount() {
      this.refresh();
      setTimeout(() => {
        this.setState({loading : false});
      }, 4);
    }


  render() {
    return(
      <div>
        <div className="container">
          <h1 className="center">Your Weekly Calendar</h1>
          <div className="btn-toolbar">
            <button type="button" className="btn btn-default prev pull-left font1">Previous week</button>
            <button type="button" className="btn btn-default next pull-right font1">Next week</button>
            <button type="button" className="btn btn-default pull-right font1">Edit this week's menu</button>
          </div>
        </div>
        <ul className = "list-inline">
          <li> Monday </li>
            {this.state.Monday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Monday" type={this.checkMealType(i)} />
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li> Tuesday </li>
            {this.state.Tuesday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Tuesday" type={this.checkMealType(i)} />
              )
            })}
        </ul>
          </div>
          )
        }
      }
