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
};


class GoogleMap extends Component {

  constructor(props) {
    super(props)
    // this.markersArray = [];

    this.infoWindow = new window.google.maps.InfoWindow();
    this.request = {
      location: this.props.options.center,
      radius: '100',
      types: ["restaurant"]
     // keyword: "restaurant"
    };
  }


  componentDidMount() {
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);

    this.initialize();
    }
    //
    initialize() {

    const service = new window.google.maps.places.PlacesService(this.map);
    service.textSearch(this.request, this.callback);
     //service.nearbySearch(this.request, this.callback); // giving weird results
    };
    
    callback(results, status) {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i])
          var place = results[i];
        //   new window.google.maps.Marker({      
        //     position:
        //   {
        //     lat: results[i].geometry.location.lat,
        //     lng: results[i].geometry.location.lng
        //   }
        // })

         //createMarker(results[i]);
        }
      }
    
    
    }
  
  
  //called after state has updated
  componentDidUpdate() {


    //remove default marker when clicking on a pin
    // this.markersArray.forEach(function (marker) {
    //   marker.setMap(null)
    // })
    // this.markersArray = [];
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

      //  this.markersArray.push(marker)

      marker.addListener('click', (e) => {
        this.props.setSelectedRestaurant(restaurant)
      })

      if (restaurant === this.props.selectedRestaurant) {
        marker.setIcon(image.URL);
      }

      marker.addListener('mouseover', (e) => {
        this.infoWindow.open(this.map, marker);
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
