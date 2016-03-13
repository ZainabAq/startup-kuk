import React from 'react';
import CalendarEntry from './calendarentry';
import {getProfileCalendarData, removeRecipefromCalendar} from '../server';
import {Link} from 'react-router';


//import {Link} from 'react-router';


export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id : this.props.user,
      edit: false,
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
      this.setState({loading: false});
      this.refresh();
      }

    handleCalChangeNext(e) {
      e.stopPropagation();
      this.setState({week: 3});
      this.setState({loading: false});
      this.refresh();
    }

    onRemoveRecipe(e, id, day, i) {
      e.stopPropagation();
      removeRecipefromCalendar(id, this.state.week, day, i)
    }

    handleCalChangeEdit(e) {
      e.stopPropagation();
      this.setState( {edit:true});
    }


  render() {
    return (
      <div>
        <div className="container">
          <h2 className="center">Your Weekly Calendar</h2>
          <div className="btn-toolbar">
            <button type="button" className="btn btn-default prev pull-left font1" onClick={(e) =>this.handleCalChangePrevious(e)}>Previous week</button>
              <Link to={"/favorites/" + this.props.user}><button type="button" className="btn btn-default pull-left font1">Add recipes</button></Link>
            <button type="button" className="btn btn-default next pull-right font1" onClick={(e) =>this.handleCalChangeNext(e)}>Next week</button>
          </div>
        <ul className = "list-inline">
          <li><h5 className="days"> Monday </h5></li>
             {this.state.Monday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Monday" type={this.checkMealType(i)} onRemove={(e, id) => this.onRemoveRecipe(e, id, "Monday", i)}/>
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li><h5 className="days">Tuesday</h5></li>
            {this.state.Tuesday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Tuesday" type={this.checkMealType(i)} onRemove={(e, id) => this.onRemoveRecipe(e, id, "Tuesday")} />
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li><h5 className="days">Wednesday</h5></li>
            {this.state.Wednesday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Wednesday" type={this.checkMealType(i)} onRemove={(e, id) => this.onRemoveRecipe(e, id, "Wednesday")} />
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li><h5 className="days">Thursday</h5></li>
            {this.state.Thursday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Thursday" type={this.checkMealType(i)} onRemove={(e, id) => this.onRemoveRecipe(e, id, "Thursday")}/>
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li><h5 className="days">Friday</h5></li>
            {this.state.Friday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Friday" type={this.checkMealType(i)} onRemove={(e, id) => this.onRemoveRecipe(e, id, "Friday")}/>
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li><h5 className="days">Saturday</h5></li>
            {this.state.Saturday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Saturday" type={this.checkMealType(i)} onRemove={(e, id) => this.onRemoveRecipe(e, id, "Saturday")}/>
              )
            })}
        </ul>
        <ul className = "list-inline">
          <li><h5 className="days">Sunday</h5></li>
            {this.state.Sunday.map((meal, i) => {
                            // i is the index
              return (
                <CalendarEntry key={i} data={meal} day="Sunday" type={this.checkMealType(i)} onRemove={(e, id) => this.onRemoveRecipe(e, id, "Sunday")}/>
              )
            })}
        </ul>
      </div>
    </div>
    )
  }
  }
