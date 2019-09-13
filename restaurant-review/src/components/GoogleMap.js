import React, { Component } from 'react'

const mapStyles = {
  map: {
    position: 'absolute',
    width: '80%',
    height: '100%'
  }
};

// Create an empty list in GoogleMap, add markers to it, 
// iterate over the markers and call setMap before this this.places.map 
//loop in componentDidUpdate

class GoogleMap extends Component {

  constructor(props){
    super(props)
    this.markersArray = [];
  }

  

  componentDidMount() {
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
  }

  //called after state has updated
  componentDidUpdate() {
    const image = {
      URL: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    }

    

  //remove default marker when clicking on a pin
  this.markersArray.forEach(function(marker){
    marker.setMap(null)
  })
  this.markersArray = [];
    // Render the markers
    this.props.places.map(restaurant => {
     
      const markerOptions = {
        position:
        {
          lat: restaurant.lat,
          lng: restaurant.long
        },
        map: this.map
      }
      
      if (restaurant === this.props.selectedPlace) {    
        markerOptions.icon = image.URL
      } 

      const marker = new window.google.maps.Marker(
        markerOptions
      )
      this.markersArray.push(marker)

      marker.addListener('click', (e) => {
        // marker.setIcon(image);
        this.props.setSelectedPlace(restaurant) 
      })


    })
  }


  render() {

    return (
      
      <div style={mapStyles.map} id={this.props.id} />
    );
  }
}

export default GoogleMap
