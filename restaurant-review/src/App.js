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
      newRestaurants: []
    }
  }

  // Load the data from restaurantData.json and GooglePlaces into the state
  setRestaurants = (apiresults) => {

    let allRestaurants = apiresults.concat(restaurantData);
    allRestaurants = allRestaurants.concat(this.state.newRestaurants)
    //   console.log(allRestaurants);

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
      //console.log(this.state.restaurantDetails.reviews)
      // let restaurantDetailsCopy = this.state.restaurantDetails;
      // restaurantDetailsCopy.reviews.unshift(newReview)

      // this.setState({
      //   restaurantDetails: restaurantDetailsCopy
      // })
      let selectedRestaurantCopy = this.state.selectedRestaurant;
      selectedRestaurantCopy["reviews"] = [];
      selectedRestaurantCopy.reviews.unshift(newReview)
      console.log(selectedRestaurantCopy.reviews)
      this.setState({
        selectedRestaurant: selectedRestaurantCopy
      })
    }
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
          addNewRestaurant={this.addNewRestaurant}
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
