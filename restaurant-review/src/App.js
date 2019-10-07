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
      restaurantDetails: null,
      newRestaurantName: null,
      newRestaurantLat: null,
      newRestaurantLng: null
    }
  }

  getCoordinates = (lat, lng) => {
    this.setState({
      newRestaurantLat: lat,
      newRestaurantLng: lng
    })
  }
  // Load the data from restaurantData.json and GooglePlaces into the state
  setRestaurants = (apiresults) => {

    let allRestaurants = apiresults.concat(restaurantData)
 
  
    if (this.state.newRestaurantName !== null) {
      let newRestaurant = {
        "name": this.state.newRestaurantName,
        "geometry": {
          "location": {
            "lat": this.state.newRestaurantLat,
            "lng": this.state.newRestaurantLng
          }
        },
        "photos" : [
          {
 
          }
       ],
        "formatted_address": "Grote Berg 4-18, 5611 KK Eindhoven",
        "reference": "101"
      }


      // if(apiresults) {
      // let trial= apiresults.concat(newRestaurant)
      // console.log(`These: ${trial}`)
      // }
      allRestaurants.push(newRestaurant)
      console.log(this.state.restaurants);
    }

    this.setState({
      restaurants: allRestaurants
    })

  }

  //filter out restaurant below the selectedRating(star)
  filterRestaurants = () => this.state.restaurants.filter((restaurant) => {
    return (
      restaurant.rating >= this.state.selectedRating || (restaurant.rating === undefined)
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

  getName = name => {
    this.setState({
      newRestaurantName: name
    })
  }

  render() {

    return (
      // <div style={{backgroundColor:"#add8e6"}}> Navbar 
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
          getName={this.getName}
          getCoordinates={this.getCoordinates}
        />


        <Sidebar
          selectedRating={this.state.selectedRating}
          setSelectedRating={this.setSelectedRating}
          restaurants={this.filterRestaurants()}
          selectedRestaurant={this.state.selectedRestaurant}
          setSelectedRestaurant={this.setSelectedRestaurant}
          handleClick={this.handleClick}
          restaurantDetails={this.state.restaurantDetails}
        />

      </div>
    )
  }

}

export default App;
