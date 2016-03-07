import React from 'react';


export default class Calendar extends React.Component {
  render() {
    <div>
      <div className="container">
        <h1 className="center">Planning Page</h1>
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
            <tbody>
              <tr>
                <td className="heading"><strong>Breakfast</strong></td>
                <td>Scrambled tofu<center><img src="img/planning-images/scrambled-tofu.jpg" className="img-rounded" /></center></td>
                <td>Oatmeal with fruit<center><img src="img/planning-images/oatmeal-fruit.jpg" className="img-rounded" /></center></td>
                <td>Eggs and bacon<center><img src="img/planning-images/eggs-bacon.jpg" className="img-rounded" /></center></td>
                <td>Banana bread<center><img src="img/planning-images/banana-bread.jpg" className="img-rounded" /></center></td>
                <td>Smoothie and bagel<center><img src="img/planning-images/bagel-smoothie.jpg" className="img-rounded" /></center></td>
                <td>Pb&j sandwich<center><img src="img/planning-images/peanut-jelly.jpg" className="img-rounded" /></center></td>
                <td>Yogurt and fruit<center><img src="img/planning-images/yogurt-fruit.jpg" className="img-rounded" /></center></td>
              </tr>
              <tr>
                <td className="heading"><strong>Lunch</strong></td>
                <td>Meatloaf<center><img src="img/planning-images/meatloaf.jpg" className="img-rounded" /></center></td>
                <td>Lasagna<center><img src="img/planning-images/lasagna.jpg" className="img-rounded" /></center></td>
                <td>Fried Rice<center><img src="img/planning-images/fried-rice.jpg" className="img-rounded" /></center></td>
                <td>Roast Beef<center><img src="img/planning-images/roast-beef.jpg" className="img-rounded" /></center></td>
                <td>Garden Burgers<center><img src="img/planning-images/garden-burger.jpg" className="img-rounded" /></center></td>
                <td>Thai curry<center><img src="img/planning-images/thai-curry.jpg" className="img-rounded" /></center></td>
                <td>Meatballs<center><img src="img/planning-images/meatballs-spaghetti.jpg" className="img-rounded" /></center></td>
              </tr>
              <tr>
                <td className="heading"><strong>Dinner</strong></td>
                <td>Chicken biryani<center><img src="img/planning-images/chicken-biryani.jpg" className="img-rounded" /></center></td>
                <td>Pumpkin ravioli<center><img src="img/planning-images/pumpkin-ravioli.jpg" className="img-rounded" /></center></td>
                <td>Midnight breakfast<center><img src="img/planning-images/midnight-breakfast.jpg" className="img-rounded" /></center></td>
                <td>Smoked salmon<center><img src="img/planning-images/smoked-salmon.jpg" className="img-rounded" /></center></td>
                <td>Beef chilli<center><img src="img/planning-images/beef-chilli.jpg" className="img-rounded" /></center></td>
                <td>Pineapple Fried Rice<center><img src="img/planning-images/pineapple-fried-rice.jpg" className="img-rounded" /></center></td>
                <td>Sushi<center><img src="img/planning-images/sushi.jpg" className="img-rounded" /></center></td>
              </tr>
              <tr>
                <td className="heading"><strong>Snack</strong></td>
                <td>Homemade granola<center><img src="img/planning-images/homemade-granola.jpg" className="img-rounded" /></center></td>
                <td>Cheese & crackers<center><img src="img/planning-images/cheese-crackers.jpg" className="img-rounded" /></center></td>
                <td>Fruit compote<center><img src="img/planning-images/fruit-compote.jpg" className="img-rounded" /></center></td>
                <td>Nuts<br /><center><img src="img/planning-images/nuts.jpg" className="img-rounded" /></center></td>
                <td>Mug cake<center><img src="img/planning-images/mug-cake.jpg" className="img-rounded" /></center></td>
                <td>Frozen yogurt<center><img src="img/planning-images/frozen-yogurt.jpg" className="img-rounded" /></center></td>
                <td>Banana smoothie<center><img src="img/planning-images/banana-smoothie.jpg" className="img-rounded" /></center></td>
              </tr>
            </tbody>
          </table>
      </container>
    </div>

  }
}
