import React from 'react';
import GoogleMap from "./components/GoogleMap";
import restaurantData from "./restaurantData.json"
import Sidebar from "./components/Sidebar"

class App extends React.Component {
  constructor(props) {
    super(props);

    // initialize the default, empty state
    this.state = {
      restaurants: [],
      selectedRestaurant: null,
      selectedRating: 0
    }
  }

  filterRestaurants = () => this.state.restaurants.filter((restaurant) => {
    return (
      restaurant.ratings[0].stars >= this.state.selectedRating
    )
  })

  componentDidMount() {
    // Load the data from restaurantData.json into the state

    this.setState({
      restaurants: restaurantData
    })

 const request = new Request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDbdKdJc9wSQ83SQAX9B34xJ_cydDMUQnQ&location=51.442,5.469&radius=500");

   
   fetch(request,
   { mode: 'no-cors'})
   
      .then(results => console.log(results))
     
    .catch(err => console.error(err));
  }


  setSelectedRestaurant = restaurant => {
    this.setState({
      selectedRestaurant: restaurant
    })
  }

  setSelectedRating = newRating => {
    this.setState({
      selectedRating: newRating
    })
  }

  render() {

    return (
      <div>
        <GoogleMap

          id="myMap"
          options={{
            center: { lat: 51.442, lng: 5.469 },
            zoom: 14
          }}

          // pass state as props to GoogleMap
          restaurants={this.filterRestaurants()}
          setSelectedRestaurant={this.setSelectedRestaurant}
          selectedRestaurant={this.state.selectedRestaurant}
        />


        <Sidebar
          selectedRating={this.state.selectedRating}
          setSelectedRating={this.setSelectedRating}
          restaurants={this.filterRestaurants()}
          selectedRestaurant={this.state.selectedRestaurant}
        />

      </div>
    )
  }

}

export default App;
