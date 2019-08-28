import React, { Component, createRef } from 'react'
import restaurantData from "./restaurantData.json";
// import Marker from "./Marker"

const mapStyles = {
    map: {
      position: 'absolute',
      width: '80%',
      height: '100%'
    }
  };

class GoogleMap extends Component {

    constructor() {
        super()
    }

  googleMapRef = createRef();

  componentDidMount() {
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDbdKdJc9wSQ83SQAX9B34xJ_cydDMUQnQ&libraries=places`
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load',() => {
      this.googleMap = this.createGoogleMap()
      this.marker = this.createMarker()
      
    })
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 14,
      center: {
        lat: 51.442,
        lng: 5.469,
      },
    //   disableDefaultUI: true
    });

   

    // initMap() {
    //     const infoWindow = new window.google.maps.InfoWindow();

    //     // Try HTML5 geolocation.
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude
    //         };

    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent('Location found.');
    //         infoWindow.open(this.googleMap);
    //         this.googleMap.setCenter(pos);
    //       }, function() {
    //         handleLocationError(true, infoWindow, this.googleMap.getCenter());
    //       });
    //     } else {
    //       // Browser doesn't support Geolocation
    //       handleLocationError(false, infoWindow, this.googleMap.getCenter());
    //     }
    // }
    
    // handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent(browserHasGeolocation ?
    //                           'Error: The Geolocation service failed.' :
    //                           'Error: Your browser doesn\'t support geolocation.');
    //     infoWindow.open(this.googleMap);
    //   }
 
  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 51.442, lng: 5.469 },
      map: this.googleMap
    })

    render() {

    //     const restaurantPins = restaurantData.map(item => {
    //         new window.google.maps.Marker({
    //           position: {
    //           lat: item.lat,
    //           lng: item.long},
    //           map: this.googleMap
    //     })
    // })

    // const restaurantPins = restaurantData.map(item => 
    //   <Marker lat={item.lat} lng={item.lng} />
    // )


 console.log(restaurantData)


    return (
        
        <div>
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={mapStyles.map}
      />
      {/* {restaurantPins} */}
      </div>
    )
  }
}

export default GoogleMap



     