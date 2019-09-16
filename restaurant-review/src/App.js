import React from 'react';
import GoogleMap from "./components/GoogleMap";
import restaurantData from "./restaurantData.json"
import Sidebar from "./components/Sidebar"
//import FilterRatings from "./components/FilterRatings"

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


  componentDidMount() {
    // Load the data from restaurantData.json into the state

    this.setState({
      restaurants: restaurantData
    })
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
    console.log(newRating)
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
          restaurants={this.state.restaurants}
          setSelectedRestaurant={this.setSelectedRestaurant}
          selectedRestaurant={this.state.selectedRestaurant}
        />


        <Sidebar
          selectedRating={this.state.selectedRating}
          setSelectedRating={this.setSelectedRating}
          restaurants={this.state.restaurants}
          selectedRestaurant={this.state.selectedRestaurant}
        />

      </div>
    )
  }

}

export default App;
