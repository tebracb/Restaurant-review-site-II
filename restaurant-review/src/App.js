import React from 'react';
import GoogleMap from "./components/GoogleMap";
import restaurantData from "./restaurantData.json"
import SidebarItem from "./components/SidebarItem"
import FilterRatings from "./components/FilterRatings"

class App extends React.Component {
  constructor(props) {
    super(props);

    // initialize the default, empty state
    this.state = {
      places: [],
      selectedPlace: null,
      selectedRating: 0
    }
  }

  componentDidMount() {
    // Load the data from restaurantData.json into the state

    this.setState({
      places: restaurantData
    })
  }

  setSelectedPlace = place => {
    this.setState({
      selectedPlace: place
    })
  }

  setSelectedRating = newRating => {
    this.setState({
      selectedRating: newRating
    })
    console.log(newRating)
  }

  render() {

    const restaurantMeta = restaurantData.map(restaurant =>
      <SidebarItem
        key={restaurant.address}
        restaurant={restaurant}
        selectedPlace={this.state.selectedPlace}
        className={this.state.selectedPlace === restaurant ? "selected" : null}
      />
    )

    return (
      <div>
        <GoogleMap

          id="myMap"
          options={{
            center: { lat: 51.442, lng: 5.469 },
            zoom: 14
          }}

          // pass state as props to GoogleMap
          places={this.state.places}
          setSelectedPlace={this.setSelectedPlace}
          selectedPlace={this.state.selectedPlace}
        />

        {/* component for the stars (for filtering ratings) */}
        {/* giving the setRating function as a prop to the FilterRating */}
        <FilterRatings
          setSelectedRating={this.setSelectedRating}
          selectedRating={this.state.selectedRating}
        />

        {restaurantMeta}
      </div>
    )
  }

}

export default App;
