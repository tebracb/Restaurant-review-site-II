import React, { Component } from 'react'
import InfoWindow from "./InfoWindow.js"
import ReactDOMServer from 'react-dom/server';


const mapStyles = {
  map: {
    position: 'absolute',
    width: '80%',
    height: '100%'
  }
};

// const image = {
//   src: 
// };


class GoogleMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      markersArray: [],
    }

    this.infoWindow = new window.google.maps.InfoWindow({
      width: 600
    });

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

  callback = (results, status) => { 

    
    
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      // TODO 1: change restaurantData.json format to match results of Google API

    //put results to App via props (callback from child to parent)
      this.props.setRestaurants(results)

      for (let i = 0; i < results.length; i++) {

        // console.log(results[i])
        let place = results[i];
        const placesMarker = new window.google.maps.Marker({      
            position:
          {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          map: this.map,
        //  icon: "img/restaurantmarker.svg",
        })
        placesMarker.addListener('mouseover', (e) => {
          this.infoWindow.open(this.map, placesMarker);
          let infoWindowContent = <InfoWindow 
          name={place.name}
          imgSrc={place.photos[0].getUrl()}
          rating = {place.rating}
          />
        // this.infoWindow.setContent(<InfoWindow content="works"/>)
       this.infoWindow.setContent(ReactDOMServer.renderToString(infoWindowContent))
       
        })
      }
      
        //createMarker(results[i]);

        // TODO 5: move this logic to componentDidUpdate
        this.props.restaurants.map(restaurant => {
        
          if( restaurant.marker === undefined ) {
            // TODO 6: create marker 

            // TODO 7: restaurant.marker = marker
          } 

          // TODO 8: update marker of restaurant that is selected

          const markerOptions = {
            position:
            {
              lat: restaurant.geometry.location.lat,
              lng: restaurant.geometry.location.lng
            },
            map: this.map
          }
          const marker = new window.google.maps.Marker(
            markerOptions
          )
          this.setState({
            markersArray: this.state.markersArray.concat(marker)
         
          })
          
          // console.log(this.state.markersArray)

          marker.addListener('mouseover', (e) => {
            this.infoWindow.open(this.map, marker);
            this.infoWindow.setContent(restaurant.name)
          })

          marker.addListener('mouseout', (e) => {
            this.infoWindow.close();
          })

        })

     

    }
  }


  //called after state has updated
  componentDidUpdate = () => {


    //remove default marker when clicking on a pin
    // this.markersArray.forEach(function (marker) {
    //   marker.setMap(null)
    // })
    // this.markersArray = [];
  
   // this.props.restaurants.map(restaurant => {
     
    this.state.markersArray.forEach(function (marker) {
    
      marker.addListener('click', (e) => {
      // this.props.setSelectedRestaurant(restaurant)
      console.log("clicked")
      // if (marker === this.props.selectedRestaurant) {
      //   marker.setIcon(image.URL);
      // }
    })
   

})


//})

 // })
}

    //Render the markers
    // this.props.restaurants.map(restaurant => {

    // const markerOptions = {
    //   position:
    //   {
    //     lat: restaurant.lat,
    //     lng: restaurant.long
    //   },
    //   map: this.map
    // }
    // const marker = new window.google.maps.Marker(
    //   markerOptions
    // )



  


render() {

  return (
<div>
    <div style={mapStyles.map} id={this.props.id} />
    
    </div>
  );
}
}

export default GoogleMap
