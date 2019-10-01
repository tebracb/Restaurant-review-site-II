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
      selectedRating: 0,
      restaurantDetails: null
    }
  }

  // Load the data from restaurantData.json and GooglePlaces into the state
  setRestaurants = (apiresults) => {
    let allRestaurants = apiresults.concat(restaurantData)
    this.setState({
      restaurants: allRestaurants
    })
  }

  filterRestaurants = () => this.state.restaurants.filter((restaurant) => {
    return (
      restaurant.rating >= this.state.selectedRating
    )
  })


  setSelectedRestaurant = restaurant => {
    this.setState({
      selectedRestaurant: restaurant
    })
    //    console.log(this.state.selectedRestaurant)
  }

  setSelectedRating = newRating => {
    this.setState({
      selectedRating: newRating
    })
  }

  handleClick = () => {
    this.setState({
      selectedRestaurant: null,
    })

  }

  getDetails = (place) => {
    this.setState({
      restaurantDetails: place
    })
    // console.log(place)

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
          setRestaurants={this.setRestaurants}
          getDetails={this.getDetails}
        />


        <Sidebar
          selectedRating={this.state.selectedRating}
          setSelectedRating={this.setSelectedRating}
          restaurants={this.filterRestaurants()}
          selectedRestaurant={this.state.selectedRestaurant}
          setSelectedRestaurant={this.setSelectedRestaurant}
          handleClick={this.handleClick}
          restaurantDetails={this.state.restaurantDetails}
          //getDetails={this.getDetails}
        />

      </div>
    )
  }

}

export default App;
