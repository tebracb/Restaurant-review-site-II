import React, { Component } from 'react'
// import Marker from "./Marker"

const mapStyles = {
  map: {
    position: 'absolute',
    width: '80%',
    height: '100%'
  }
};

class GoogleMap extends Component {

  constructor(props) {
    super(props)
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const infoWindow = new window.google.maps.InfoWindow()
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)

    //------------------------------GEOLOCATION-------------------------//

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);

        //adding user's current position to the map
        const marker = new window.google.maps.Marker({
          position: {
            lat: pos.lat,
            lng: pos.lng
          },
          map: map
        })

      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
  }


  componentDidMount() {
    if (!window.google) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDbdKdJc9wSQ83SQAX9B34xJ_cydDMUQnQ&`;
      const x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }


  render() {
    return (
      <div style={mapStyles.map} id={this.props.id} />
    );
  }
}
export default GoogleMap





//   createMarker = () =>
//     new window.google.maps.Marker({
//       position: { lat: 51.442, lng: 5.469 },
//       map: this.googleMap
//     })

//   render() {

//     //     const restaurantPins = restaurantData.map(item => {
//     //         new window.google.maps.Marker({
//     //           position: {
//     //           lat: item.lat,
//     //           lng: item.long},
//     //           map: this.googleMap
//     //     })
//     // })

//     const restaurantPins = restaurantData.map(item => 
//       <Marker lat={item.lat} lng={item.lng} map={this.googleMap} />
//     )


//     console.log(restaurantData)


//     return (

//       <div>
//         <div
//           id="google-map"
//           ref={this.googleMapRef}
//           style={mapStyles.map}
//         />
//         {restaurantPins}
//       </div>
//     )
//   }
// }

// export default GoogleMap



