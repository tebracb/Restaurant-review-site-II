import React, { Component } from 'react'

const mapStyles = {
  map: {
    position: 'absolute',
    width: '80%',
    height: '100%'
  }
};

class GoogleMap extends Component {

  componentDidMount() {
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
  }

  //called after state has updated
  componentDidUpdate() {
    var image = {
      URL: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    }

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
      } else {
        markerOptions.icon = null
      }

      const marker = new window.google.maps.Marker(
        markerOptions
      )


      marker.addListener('click', (e) => {
        // marker.setIcon(image);
        this.props.setSelectedPlace(restaurant)
      
      
      })


    })
  }



  // TODO : iconchange on click, list of restaurants on the right (separate component - 
  //placeList, placeListItem
  //)

  render() {
    return (
      <div style={mapStyles.map} id={this.props.id} />
    );
  }
}

export default GoogleMap
