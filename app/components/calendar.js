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
      week: 2,
      Monday : [],
      Tuesday: [],
      Wednesday : [],
      Thursday : [],
      Friday : [],
      Saturday : [],
      Sunday: []
    }

  }
    refresh() {
       getProfileCalendarData(this.props.user, this.state.week, (profileData) => {
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

    handleCalChangePrevious(e) {
      e.stopPropagation();
      this.setState({week: 1});
      this.refresh();
        }

    handleCalChangeNext(e) {
      e.stopPropagation();
      this.setState({week: 3});
      this.refresh();
    }

  render() {
    return(
      <div>
        <div className="container">
          <h1 className="center">Your Weekly Calendar</h1>
          <div className="btn-toolbar">
            <button type="button" className="btn btn-default prev pull-left font1" onClick={(e) =>this.handleCalChangePrevious(e)}>Previous week</button>
            <button type="button" className="btn btn-default next pull-right font1" onClick={(e) =>this.handleCalChangeNext(e)}>Next week</button>
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
        <ul className = "list-inline">
          <li> Wednesday </li>
            {this.state.Wednesday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Wednesday" type={this.checkMealType(i)} />
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li> Thursday </li>
            {this.state.Thursday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Thursday" type={this.checkMealType(i)} />
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li> Friday </li>
            {this.state.Friday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Friday" type={this.checkMealType(i)} />
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li> Saturday </li>
            {this.state.Saturday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Saturday" type={this.checkMealType(i)} />
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li> Sunday </li>
            {this.state.Sunday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Sunday" type={this.checkMealType(i)} />
              )
            })}
        </ul>
      </div>
          )
        }
      }
