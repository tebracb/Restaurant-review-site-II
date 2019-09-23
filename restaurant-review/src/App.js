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

  setRestaurants = (dataFromChild) => {
    this.setState({
      restaurants: dataFromChild
    })
  }

  filterRestaurants = () => this.state.restaurants.filter((restaurant) => {
    return (
      restaurant.rating >= this.state.selectedRating
    )
  })

  componentDidMount() {
    // Load the data from restaurantData.json into the state

    // this.setState({
    //   restaurants: restaurantData
    // })


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

  // TODO 4: create function setRestaurants, which merges results into restaurants from the state

  // childHandler(dataFromChild) {
  //   // log our state before and after we updated it
  //   console.log('%cPrevious Parent State: ' + JSON.stringify(this.state), "color:orange");
  //   this.setState({
  //       data: dataFromChild
  //   },() => console.log('Updated Parent State:', this.state));

 

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
          setRestaurants = {this.setRestaurants}
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
