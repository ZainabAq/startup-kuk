import React from 'react';
import CalendarEntry from './calendarentry';
import {getCalendarSync} from '../server';

export default class Calendar extends React.Component {
    // constructor(props) {
    //   this.state = {
    //     meals = []
    //   };
    // }

    refresh() {
      getCalendarSync(this.props.user, (calendarData) => {
        this.setState(calendarData)
      });
    }

    onEdit() {

    }

    onPreviousWeek() {

    }

    onNextWeek() {

    }

    componentsDidMount() {
      this.refresh();
    }


  render() {
    return(
      <div>
        <div className="container">
          <h1 className="center"></h1>
          <div className="btn-toolbar">
            <button type="button" className="btn btn-default prev pull-left font1">Previous week</button>
            <button type="button" className="btn btn-default next pull-right font1">Next week</button>
            <button type="button" className="btn btn-default pull-right font1">Edit this week's menu</button>
            </div>
        </div>
        <container>
            <table className="calendar table table-bordered table-condensed table-nonfluid">
              <thead>
                <tr>
                  <th>Meals</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                  <th>Sunday</th>
                </tr>
              </thead>
              <div>
                <CalendarEntry onPost={(postContents) => this.onPost(postContents)} />
                    {this.state.meals.map((recipe) => {
                      return (
                        <CalendarEntry key={recipe.id} data={recipe} />
                      )
                    })}
              </div>
            </table>
            </container>
            </div>
          )
        }
      }
