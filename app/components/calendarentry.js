import React from 'react';
import {getCalendarSync, getRecipe} from '../server';

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    // The CalendarEntry's initial state is what the Calendar passed to us.
    this.state = props.data;
  }

  handleDidUserClick(clickEvent) {

  }

  render () {
    return (
      <div>
      <container>
      <table>
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
)
}
}