"calendars" {
   "1": {
      "_id": 1,
      "firstWeek": {
         "Monday": [1, 1, 1, 1], "Tuesday": [2, 2, 2, 2], "Wednesday": [3, 3, 3, 3], "Thursday": [4, 4, 4, 4], "Friday":[5, 5, 5, 5], "Saturday": [6, 6, 6, 6], "Sunday": [1, 2, 3, 4]
      },
      "secondWeek": {
         "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday":[], "Saturday":, "Sunday": []
      },
      "thirdWeek": {
         "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday":[], "Saturday":, "Sunday": []
      },
      "fourthWeek": {
         "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday":[], "Saturday":, "Sunday": []
      }
   }
}


<span className="fa fa-heart fa-lg social-but"></span>
 <span className="fa fa-calendar-check-o fa-lg social-but"></span>
 <span className="fa fa-share-square fa-lg social-but"></span>


 <li className="shopping-item">
    {(() => {
       var items=[];
       for (var i=0; i<this.state.list.length; i++) {
          items.push(this.state.list[i])
       }
       return items;
    })()}
 </li>


 // var mondayArr = calendarObject["Monday"];
// var tuesdayArr = calendarObject["Tuesday"];
// var wednesdayArr = calendarObject["Wednesday"];
// var thursdayArr = calendarObject["Thursday"];
// var fridayArr = calendarObject["Friday"];
// var saturdayArr = calendarObject["Saturday"];
// var sundayArr = calendarObject["Sunday"];




app.get('/user/:userid/shoppinglist/', function(req, res) {
   var fromUser = getUserIdFromToken(req.get("Authorization"));
   var userid = req.params.userid;
   var weekList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   //what if instead of running through each of these individually, we run through
   //a for loop that runs through each of the days and within that runs through
   //each of the days of the week?
   if (fromUser === userid) {
      //here we're going to use Zainab's getCalendarSync method
      //and then parse through the resulting meals to get The
      //ingredients from that, and return those ingredients in a list
      console.log("HELL YEAH");
      userid = new ObjectID (userid);
      db.collection("users").findOne({_id:userid}, function(err, user) {
         if (err) {
            sendDatabaseError(res, err);
         } else {
            getWeekCal(user, 2, function(err, calendarObject) {
               if (err) {
                  sendDatabaseError(res, err);
               } else {
                  console.log(calendarObject);
                  for (var i=0; i<weekList.length; i++) {
                     console.log(i);
                     console.log(weekList[i]);
                     console.log(calendarObject[weekList[i]]);
                     getMealsforDay(calendarObject, calendarObject[weekList[i]], function(err, meals) {
                        if (err) {
                           sendDatabaseError(res, err);
                        } else {
                           console.log("MEALS IS:", meals);
                           console.log(calendarObject[weekList[i]]);
                        }
                     })
                  }
               }
            });
         }
      });
      res.send("Huzzah!")
   } else {
      res.status(401).end();
   }
});








<li><a onClick={(e)=>this.handleCalendarClick(e, "Monday")}>Monday</a></li>
<li><a onClick={(e)=>this.handleCalendarClick(e, "Tuesday")}>Tuesday</a></li>
<li><a onClick={(e)=>this.handleCalendarClick(e, "Wednesday")}>Wednesday</a></li>
<li><a onClick={(e)=>this.handleCalendarClick(e, "Thursday")}>Thursday</a></li>
<li><a onClick={(e)=>this.handleCalendarClick(e, "Friday")}>Friday</a></li>
<li><a onClick={(e)=>this.handleCalendarClick(e, "Saturday")}>Saturday</a></li>
<li><a onClick={(e)=>this.handleCalendarClick(e, "Sunday")}>Sunday</a></li>






<ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
   <li className="dropdown-submenu">
      <a tabIndex="-1" href="#">Week One</a>
      <ul className="dropdown-menu">
         <li className="dropdown-submenu">
            <a href="#">Monday</a>
            <ul className="dropdown-menu">
               <li><a onClick={(e)=>this.handleCalendarClick(e, 1, "Monday", 0)}>Breakfast</a></li>
               <li><a onClick={(e)=>this.handleCalendarClick(e, 1,  "Monday", 1)}>Lunch</a></li>
               <li><a onClick={(e)=>this.handleCalendarClick(e, 1,  "Monday", 2)}>Snack</a></li>
               <li><a onClick={(e)=>this.handleCalendarClick(e, 1,  "Monday", 3)}>Dinner</a></li>
            </ul>
         </li>
         <li className="dropdown-submenu">
            <a href="#">Tuesday</a>
            <ul className="dropdown-menu">
               <li><a href="#">Breakfast</a></li>
               <li><a href="#">Lunch</a></li>
               <li><a href="#">Snack</a></li>
               <li><a href="#">Dinner</a></li>
            </ul>
         </li>
         <li className="dropdown-submenu">
            <a href="#">Wednesday</a>
            <ul className="dropdown-menu">
               <li><a href="#">Breakfast</a></li>
               <li><a href="#">Lunch</a></li>
               <li><a href="#">Snack</a></li>
               <li><a href="#">Dinner</a></li>
            </ul>
         </li>
         <li className="dropdown-submenu">
            <a href="#">Thursday</a>
            <ul className="dropdown-menu">
               <li><a href="#">Breakfast</a></li>
               <li><a href="#">Lunch</a></li>
               <li><a href="#">Snack</a></li>
               <li><a href="#">Dinner</a></li>
            </ul>
         </li>
         <li className="dropdown-submenu">
            <a href="#">Friday</a>
            <ul className="dropdown-menu">
               <li><a href="#">Breakfast</a></li>
               <li><a href="#">Lunch</a></li>
               <li><a href="#">Snack</a></li>
               <li><a href="#">Dinner</a></li>
            </ul>
         </li>
         <li className="dropdown-submenu">
            <a href="#">Saturday</a>
            <ul className="dropdown-menu">
               <li><a href="#">Breakfast</a></li>
               <li><a href="#">Lunch</a></li>
               <li><a href="#">Snack</a></li>
               <li><a href="#">Dinner</a></li>
            </ul>
         </li>
         <li className="dropdown-submenu">
            <a href="#">Sunday</a>
            <ul className="dropdown-menu">
               <li><a href="#">Breakfast</a></li>
               <li><a href="#">Lunch</a></li>
               <li><a href="#">Snack</a></li>
               <li><a href="#">Dinner</a></li>
            </ul>
         </li>
      </ul>
   </li>
   <li className="dropdown-submenu">
      <a tabIndex="-1" href="#">Week Two</a>
   </li>
   <li className="dropdown-submenu">
      <a tabIndex="-1" href="#">Week Three</a>
   </li>
   <li className="dropdown-submenu">
      <a tabIndex="-1" href="#">Week Four</a>
   </li>
</ul>
