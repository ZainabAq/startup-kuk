//shopping list component
import React from 'react';
import {getShoppingList} from '../server';


export default class Shopping extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         value: this.props.value,
         list: []
      };
   }

   refresh() {
      this.getWeeklyList();
   }

   componentDidMount() {
      this.refresh();
   }

   getWeeklyList() {
      // this.setState({list:['vindaloo', 'garlic', 'beef']});
      getShoppingList('000000000000000000000001', (newList) => {
         this.setState({list:newList});
      });
   }

   onEnter() {
      var trimmedTerm = this.state.value.trim();
      this.setState({list:this.state.list.concat([trimmedTerm])});
      this.setState({value:""});
   }

   handleKeyUp(e) {
      e.preventDefault();
      if (e.key == 'Enter') {
         this.onEnter();
      }
   }

   handleChange(e) {
      e.preventDefault();
      this.setState({value:e.target.value});
   }

   render() {
      return (
         <div className="shopping">
            <h1 className="center">Shopping List</h1>
            <div className="col-md-offset-3 col-md-6 col-md-offset-3">
              <div className="panel-body main-background">
                 <input type="text" className="form-control add-item" placeholder="Add item" value={this.state.value} onChange={(e) => this.handleChange(e)} onKeyUp={(e)=>this.handleKeyUp(e)}></input>
                 <hr />
                 <div className="ingredient-bar">
                   <ul>
                      {this.state.list.map(function(listItem, index) {
                         return <li key={index}>{listItem}</li>;
                      })}
                   </ul>
                 </div>
              </div>
            </div>
         </div>
      );
   }
}
