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

const image = {
  URL: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' 
};

let markerOptions = []

class GoogleMap extends Component {

  constructor(props) {
    super(props)

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
  initialize() {
    const service = new window.google.maps.places.PlacesService(this.map);
    service.textSearch(this.request, this.callback);

    //service.nearbySearch(this.request, this.callback); // giving weird results
  };

  callback = (results, status) => {

    if (status === window.google.maps.places.PlacesServiceStatus.OK) {

      //put results to App via props (callback from child to parent)
      this.props.setRestaurants(results)

      for (let i = 0; i < results.length; i++) {

        // console.log(results[i])
        let place = results[i];
        // const placesMarker = new window.google.maps.Marker({
        //   position:
        //   {
        //     lat: place.geometry.location.lat(),
        //     lng: place.geometry.location.lng()
        //   },
        //   map: this.map,
        //   //  icon: "img/restaurantmarker.svg",
        // })
        //   placesMarker.addListener('mouseover', (e) => {
        //     this.infoWindow.open(this.map, placesMarker);
        //     let infoWindowContent = <InfoWindow
        //       name={place.name}
        //       imgSrc={place.photos[0].getUrl()}
        //       rating={place.rating}
        //     />
        //     this.infoWindow.setContent(ReactDOMServer.renderToString(infoWindowContent))
        //   })

        //   placesMarker.addListener('mouseout', (e) => {
        //     this.infoWindow.close();
        //   })
        // }

        //createMarker(results[i]);  
      }

    }
  }

  //called after state has updated
  componentDidUpdate = () => {

    // TODO 5: move this logic to componentDidUpdate
    this.props.restaurants.map(restaurant => {

      if (restaurant.marker === undefined) {
        // TODO 6: create marker 

        // console.log("function")
        markerOptions = {

          position:
          {
            lat: typeof restaurant.geometry.location.lat === "function" ? restaurant.geometry.location.lat() : restaurant.geometry.location.lat,
            lng: typeof restaurant.geometry.location.lng === "function" ? restaurant.geometry.location.lng() : restaurant.geometry.location.lng
          },
          map: this.map
        }
        this.marker = new window.google.maps.Marker(
          markerOptions
        )

      }

      //console.log(restaurant.geometry.location.lat)
      //   // TODO 7: restaurant.marker = marker
    

      // TODO 8: update marker of restaurant that is selected



      // this.marker.addListener('click', (e) => {
      //   this.props.setSelectedRestaurant(restaurant)
      //   // console.log("clicked")
      //    restaurant.marker.setIcon(image.URL);
      //   // }
      // })



      this.marker.addListener('mouseover', (e) => {
      let infoWindowContent = <InfoWindow
        name={restaurant.name}
        imgSrc={typeof restaurant.photos[0].getUrl === "function" ? restaurant.photos[0].getUrl() : restaurant.photos[0]}
        rating={restaurant.rating}
      />
      this.infoWindow.open(this.map, this.marker);
      this.infoWindow.setContent(ReactDOMServer.renderToString(infoWindowContent))

    })

      this.marker.addListener('mouseout', (e) => {
      this.infoWindow.close();
    })

    })
}


render() {

  return (
    <div>
      <div style={mapStyles.map} id={this.props.id} />

    </div>
  );
}
}

export default GoogleMap
