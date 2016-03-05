//recipe component
import React from 'react';

export default classNameName Recipe extends React.Component {
   constructor(props) {
      super(props);
      // The recipe's initial state
      this.state = props.data;
   }
   render() {
      return (
         <div>
         <div className="container">
           <div className="row">
             <div className="col-md-1">
             <!-- Left Sidebar -->
             </div>
             <div className="col-md-10">
               <!-- Main Feed -->
               <div className="panel panel-default">
                 <div className="panel-heading2">
                    <!-- <h3 className="panel-title">Recipe!</h3> -->
                    <div className="row">
                       <div className="col-xs-10">
                          <h1 className="panel-title">Molten Lava Cake</h1>
                          <br />

                          <ul className="list-inline">
                           <li className="rating">
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                              <span className="fa fa-star"></span>
                           </li>
                           <li className="time-icons">
                                1.5 Hours
                              <span className="fa fa-clock-o"></span>
                           </li>

                          </ul>
                       </div>
                       <div className="col-xs-2">
                          <!-- Will need to put in a className here for the css -->
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
                    </div>
                 </div>
                 <div className="panel-body">

                    <!-- Dividing the second part of the div into 3 columns -->
                    <div className="row">
                       <div className="col-md-3 ingredient-bar">
                          <div className="checkbox">
                             <label><input type="checkbox" value="">pat of butter</label>
                          </div>
                          <div className="checkbox">
                             <label><input type="checkbox" value="">2 egg yolks</label>
                          </div>
                          <div className="checkbox">
                             <label><input type="checkbox" value="">2 eggs</label>
                          </div>
                          <div className="checkbox">
                             <label><input type="checkbox" value="">3 tablespoons white sugar</label>
                          </div>
                          <div className="checkbox">
                             <label><input type="checkbox" value="">3 1/2 oz dark chocolate</label>
                          </div>
                          <div className="checkbox">
                             <label><input type="checkbox" value="">5 tablespoons butter</label>
                          </div>
                          <div className="checkbox">
                             <label><input type="checkbox" value="">4 teaspoons unsweetened cocoa powder</label>
                          </div>
                          <div className="checkbox">
                             <label><input type="checkbox" value="">3 tablespoons flour</label>
                          </div>

                          <div className="checkbox">
                             <label><input type="checkbox" value="">1 pinch salt</label>
                          </div>
                          <div className="checkbox">
                             <label><input type="checkbox" value="">1/8 teaspoons vanilla extract</label>
                          </div>

                       </div>
                 <div className="col-md-9">
                    <ol className="instruction-list">
                      <li className="instruction">
                        <img src="img/lavaCake.jpg" width="35%" align="right" className="img-rounded food-pic"/>
                        Generously butter the inside of 4 (5 1/2 ounce) ramekins. Place them in a casserole dish.
                      </li>
                      <li className="instruction">
                        Whisk together egg yolks, eggs, and sugar in a bowl until light, foamy, and lemon colored.
                      </li>
                      <li className="instruction">
                        Melt chocolate and butter in a microwave-safe bowl in 30-second intervals, stirring after each melting, 1 to 3 minutes.
                      </li>
                      <li className="instruction">
                        Stir melted chocolate mixture into egg and sugar mixture until combined.
                      </li>
                      <li className="instruction">
                        Sift cocoa powder into the mixture; stir to combine.
                      </li>
                      <li className="instruction">
                        Sift flour and salt into the mixture; stir to combine into a batter.
                      </li>
                      <li className="instruction">
                        Stir vanilla extract into the batter.
                      </li>
                     <li className="instruction">
                        Transfer batter to a resealable plastic bag. Snip one corner of the bag with scissors to create a tip.
                      </li>
                      <li className="instruction">
                        Divide batter evenly between the prepared ramekins; tap gently on the counter to remove any air bubbles.
                      </li>
                      <li className="instruction">
                        Refrigerate 30 minutes.
                      </li>
                      <li className="instruction">
                        Preheat an oven to 425 degrees F (220 degrees C).
                      </li>
                      <li className="instruction">
                        Arrange the ramekins in a casserole dish. Pour enough hot tap water into the casserole dish to reach halfway up the sides of the ramekins.
                      </li>
                      <li className="instruction">
                        Bake in the preheated over for 15-18 minutes. Set aside to cool for 15 minutes.
                      </li>
                      <li className="instruction">
                        Loosen the edges from the ramekin with a knife. Invert each cake onto a plate and dust with powdered sugar.
                      </li>
                    </ol>
                 </div>
                 <!-- Will want to add an image className here to control through css -->
                 <!-- <div className="col-md-4">
                    <img src="img/chocolateChipCookies.jpg" width="100%" />
                 </div> -->
             </div>

                 </div>
                 <!-- <div className="panel-footer">

                 </div> -->
               </div>

             </div>
             <div className="col-md-1">
                <!-- Right Sidebar -->
             </div>
           </div>
         </div>
         </div>


      )
   }

}
