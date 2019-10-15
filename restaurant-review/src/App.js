import React from 'react';
import GoogleMap from "./components/GoogleMap";
import restaurantData from "./restaurantData.json"
import Sidebar from "./components/Sidebar"
import "./App.css"


class App extends React.Component {
  constructor(props) {
    super(props);

    // initialize the default, empty state
    this.state = {
      restaurants: [],
      selectedRestaurant: null,
      selectedRating: 0,
      restaurantDetails: null,
      newRestaurants: [],
      bounds: ""
    }

    this.logo = require("./components/img/lasagna.png")
  }

  // Load the data from restaurantData.json and GooglePlaces into the state
  setRestaurants = (apiresults) => {

    let allRestaurants = apiresults.concat(restaurantData);
    allRestaurants = allRestaurants.concat(this.state.newRestaurants);


    this.setState({
      restaurants: allRestaurants
    })
  }

  //filter out restaurant below the selectedRating(star) and restaurants outside the bounds of the map
  filterRestaurants = () => this.state.restaurants.filter((restaurant) => {
    return (
      (restaurant.rating >= this.state.selectedRating || (restaurant.rating === undefined)) && (this.state.bounds.contains(restaurant.geometry.location))
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

  setBounds = bounds => {
    this.setState({
      bounds:bounds
    })
  }


  handleCloseClick = () => {
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

  addNewRestaurant = newRestaurant => {
    let newRestaurants = this.state.newRestaurants
    newRestaurants.push(newRestaurant)
    this.setState({
      newRestaurants: newRestaurants
    })

    let restaurants = this.state.restaurants
    restaurants.unshift(newRestaurant)
    this.setState({
      restaurants: restaurants
    })
  }

  addNewReview = newReview => {

    //if restaurant is from JSON or added by the user  
    if (this.state.selectedRestaurant.reviews !== undefined) {
      let selectedRestaurantCopy = this.state.selectedRestaurant;
      selectedRestaurantCopy.reviews.unshift(newReview)

      this.setState({
        selectedRestaurant: selectedRestaurantCopy
      })
    }

    //if restaurant comes from the API and reviews from the Place Details API
    else {
      let selectedRestaurantCopy = this.state.selectedRestaurant;
      selectedRestaurantCopy["reviews"] = [];
      selectedRestaurantCopy.reviews.unshift(newReview)
      this.setState({
        selectedRestaurant: selectedRestaurantCopy
      })
    }
  }



  render() {

    return (
    <div>
     <div className="Navbar">
     
    <img className="logo" alt="Lasagna logo" src= {this.logo} />
    <h2>Lasagna! <span>- the No 1 restaurant rating app</span></h2>
       
     </div>
      
        <GoogleMap

          id="myMap"

          // pass state as props to GoogleMap
          restaurants={this.filterRestaurants()}
          setSelectedRestaurant={this.setSelectedRestaurant}
          selectedRestaurant={this.state.selectedRestaurant}
          setRestaurants={this.setRestaurants}
          getDetails={this.getDetails}
          addNewRestaurant={this.addNewRestaurant}
          setBounds={this.setBounds}
        />


        <Sidebar
          selectedRating={this.state.selectedRating}
          setSelectedRating={this.setSelectedRating}
          restaurants={this.filterRestaurants()}
          selectedRestaurant={this.state.selectedRestaurant}
          setSelectedRestaurant={this.setSelectedRestaurant}
          handleCloseClick={this.handleCloseClick}
          restaurantDetails={this.state.restaurantDetails}
          addNewReview={this.addNewReview}
        />

      </div>
    )
  }

}

export default App;
