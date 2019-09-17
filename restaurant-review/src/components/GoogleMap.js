import React, { Component } from 'react'

const mapStyles = {
  map: {
    position: 'absolute',
    width: '80%',
    height: '100%'
  }
};

const image = {
  URL: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
}

class GoogleMap extends Component {

  constructor(props) {
    super(props)
    this.markersArray = [];

    this.infoWindow = new window.google.maps.InfoWindow();
  }


  componentDidMount() {
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
  }


  //called after state has updated
  componentDidUpdate() {


    //remove default marker when clicking on a pin
    this.markersArray.forEach(function (marker) {
      marker.setMap(null)
    })
    this.markersArray = [];
    // Render the markers
    this.props.restaurants.map(restaurant => {

      const markerOptions = {
        position:
        {
          lat: restaurant.lat,
          lng: restaurant.long
        },
        map: this.map
      }


      const marker = new window.google.maps.Marker(
        markerOptions
      )

      

     this.markersArray.push(marker)

      marker.addListener('click', (e) => {
        this.props.setSelectedRestaurant(restaurant)
      })

      if (restaurant === this.props.selectedRestaurant) {
        marker.setIcon(image.URL); 
      }

      marker.addListener('mouseover', (e) => { 
        this.infoWindow.open(this.map,marker);
        this.infoWindow.setContent(restaurant.restaurantName)
      })

      marker.addListener('mouseout', (e) => { 
        this.infoWindow.close();
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
