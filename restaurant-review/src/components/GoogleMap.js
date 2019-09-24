import React, { Component } from 'react'
import InfoWindow from "./InfoWindow.js"
import ReactDOMServer from 'react-dom/server';
import "./GoogleMap.css"


const mapStyles = {
  map: {
    position: 'absolute',
    width: '78%',
    height: '100%'
  }
};

const image = {
  URL: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
};


const defaultImg = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png'


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

    const service = new window.google.maps.places.PlacesService(this.map);
    service.textSearch(this.request, this.callback);

    //service.nearbySearch(this.request, this.callback); // giving weird results
  };

  callback = (results, status) => {

    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      console.log(results)
      //put results to App via props (callback from child to parent)
      this.props.setRestaurants(results)

    }
  }

  //called after state has updated
  componentDidUpdate = (prevProps) => {

    this.props.restaurants.forEach(restaurant => {

      if (restaurant.marker === undefined) {
        console.log("marker created")
        let markerOptions = {

          position:
          {
            lat: typeof restaurant.geometry.location.lat === "function" ? restaurant.geometry.location.lat() : restaurant.geometry.location.lat,
            lng: typeof restaurant.geometry.location.lng === "function" ? restaurant.geometry.location.lng() : restaurant.geometry.location.lng
          },

          map: this.map

        }
        restaurant.marker = new window.google.maps.Marker(
          markerOptions
        )
        restaurant.marker.addListener('mouseover', (e) => {
          let infoWindowContent = <InfoWindow
            name={restaurant.name}
            imgSrc={typeof restaurant.photos[0].getUrl === "function" ? restaurant.photos[0].getUrl() : restaurant.photos[0]}
            rating={restaurant.rating}
          />
          this.infoWindow.open(this.map, restaurant.marker);
          this.infoWindow.setContent(ReactDOMServer.renderToString(infoWindowContent))

        })

        restaurant.marker.addListener('mouseout', (e) => {
          this.infoWindow.close();
        })

        restaurant.marker.addListener('click', (e) => {

          this.props.setSelectedRestaurant(restaurant)
        })
      }

      if (this.props.selectedRestaurant === restaurant) {
        restaurant.marker.setIcon(image.URL);

      } else {

        restaurant.marker.setIcon(defaultImg.URL);
      }

      restaurant.marker.setVisible(true)

    })

    prevProps.restaurants.forEach( restaurant => {
      if (!this.props.restaurants.includes(restaurant)) {
        restaurant.marker.setVisible(false)
      } 
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
