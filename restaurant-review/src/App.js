import React from 'react';
import { render } from 'react-dom'; //????
import GoogleMap from "./GoogleMap";
import InfoWindow from "./InfoWindow";
import restaurantData from "./restaurantData.json";
// import Marker from "./Marker"

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
      render(<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
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
     
        onMapLoad={map => {
          
          //---DOESN'T WORK BECAUSE marker is moved to other component------

          // marker.addListener('click', e => {
          //   this.createInfoWindow(e, map)
          // })

         const restaurantMarkers = restaurantData.map(item => {
            new window.google.maps.Marker({
              position: {
                lat: item.lat,
                lng: item.long
              },
              map: map
            })
        
        })
          
        //--------------------TRYING TO RENDER MARKERS AS SEPARATE COMPONENT------------

        // const restaurantMarkers = restaurantData.map(restaurant => {
        //   return(
        //   <Marker
        //   key={restaurant.address}
        //   lat={restaurant.lat}
        //   lng={restaurant.lng}
        //   map={this.map}
        //   />
        //   )
        // })
        // {restaurantMarkers}

        //-------------------------LOOPING THROUGH MARKERS---------------------
      
          // restaurantMarkers.forEach (marker => {
          //       marker.addListener('click', e => {
          //       this.createInfoWindow(e, map)
          //   })
          //   console.log(marker.lat)
          // })

        }}
        
      />
   
      </div>
    )

  }

}


export default App;
