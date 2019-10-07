import React, { Component } from 'react'
import InfoWindow from "./InfoWindow.js"
import ReactDOMServer from "react-dom/server"
import Form from "./Form"

const mapStyles = {
  map: {
    position: 'absolute',
    width: '78%',
    height: '95%',
    bottom: '0'
  }
};

const selectedMarker = {
  URL: require("./img/restaurant.png")
};

const defaultImg = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png'
// src={require("./img/location-pin.png")} 


class GoogleMap extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      newRestaurantLat: "",
      newRestaurantLng: ""
    }

    this.infoWindow = new window.google.maps.InfoWindow({
      width: 600
    });

    //  this.visibleRestaurants = [];
  }

  closeForm = () => {
    this.setState({
      showForm: false
    })
  }


  // PLACE DETAILS API //
  getPlaceDetail = (placeId) => {
    const placeRequest = {
      placeId: placeId,
      fields: ['name', 'rating', 'reviews', 'place_id', 'formatted_phone_number', 'website', 'photos']
    };

    const service = new window.google.maps.places.PlacesService(this.map);
    service.getDetails(placeRequest, this.placeCallback)
  }


  componentDidMount() {

    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);

    // GOOGLE PLACES API  
    //- sending new request every time user changes bounds on the map//
    this.map.addListener('idle', (e) => {
      const request = {
        location: this.map.getCenter(),
        radius: '100',
        //bounds: this.map.getBounds(),
        types: ["restaurant"]
        // keyword: "restaurant"

        //service.nearbySearch(this.request, this.callback); // giving weird results
      };

      // TODO: make only 1 service (just like how we're only making 1 map)
      const service = new window.google.maps.places.PlacesService(this.map);
      service.textSearch(request, this.callback);
    })

    this.map.addListener("rightclick", (e) => {

      let lat = e.latLng.lat();
      let lng = e.latLng.lng()

      this.setState({
        showForm: true,
        newRestaurantLat: lat,
        newRestaurantLng: lng
      })

    })
  }

  callback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      // console.log(results)

      //filtering out results which don't have photo or ratings
      let validResults = results.filter((result) => {
        if (result.photos && result.rating !== 0) {
          return result
        }
      })

      //put results to App via props (callback from child to parent)
      this.props.setRestaurants(validResults)
    }
  }

  placeCallback = (place, status) => {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      this.props.getDetails(place)
    }
  }

  //called after state has updated
  componentDidUpdate = (prevProps) => {

    this.props.restaurants.forEach(restaurant => {
      if (restaurant.marker === undefined) {
        // console.log(restaurant)
        let markerOptions = {

          position:
          //checking if lat is a function (when coming from API); otherwise add regular lat,lng (when coming from JSON)
          {
            lat: typeof restaurant.geometry.location.lat === "function" ? restaurant.geometry.location.lat() : restaurant.geometry.location.lat,
            lng: typeof restaurant.geometry.location.lng === "function" ? restaurant.geometry.location.lng() : restaurant.geometry.location.lng
          },
          map: this.map,
          icon: "/img/restaurantmarker.svg"
        }
        restaurant.marker = new window.google.maps.Marker(
          markerOptions
        )



        //--------------------ADD LISTENERS-----------------------//

        if (this.newMarker) {
          restaurant.marker.push(this.newMarker)
        }


        restaurant.marker.addListener('mouseover', (e) => {
          let infoWindowContent = <InfoWindow
            name={restaurant.name}
            imageAvailable={restaurant.photos !== undefined ? true : false}
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

      //if marker or SidebarItem click changes selectedRestaurant, Place Detials API gets details of new 
      // selectedRestaurant and it's displayed in Sidebar

      if (this.props.selectedRestaurant && (prevProps.selectedRestaurant !== this.props.selectedRestaurant)) {
        this.getPlaceDetail(this.props.selectedRestaurant.place_id)
      }

      // Marker changes
      if (this.props.selectedRestaurant === restaurant) {
        restaurant.marker.setIcon(selectedMarker.URL);

      } else {
        restaurant.marker.setIcon(defaultImg.URL)
        //restaurant.marker.setIcon(require("./img/restaurantmarker.svg"))
      }

      restaurant.marker.setVisible(true)

      // let bounds = this.map.getBounds()
      //   if (!bounds.contains(restaurant.marker.position)){
      //   console.log("out")
      //   }


      //   this.map.addListener("zoom_changed", (e) => {
      //     let bounds = this.map.getBounds()
      //   // let bounds = this.map.getBounds()
      //   // if (bounds.contains(restaurant.marker.position)){

      //   //   this.visibleRestaurants.concat(restaurant)
      //   //   this.props.setRestaurants(this.visibleRestaurants)
      //   //   }
      // })

    })


    // changing visible markers when restaurant array in App's state is changing (e.g star rating filter was changed)
    prevProps.restaurants.forEach(restaurant => {
      if (!this.props.restaurants.includes(restaurant)) {
        restaurant.marker.setVisible(false)
      }
    })

  }

  render() {

    return (
      <div>
        <div style={mapStyles.map} id={this.props.id} />
        <div> {this.state.showForm ? <Form
          closeForm={this.closeForm}
          newRestaurantLat={this.state.newRestaurantLat}
          newRestaurantLng={this.state.newRestaurantLng}
          addNewRestaurant={this.props.addNewRestaurant}
        /> : null}
        </div>
      </div>
    );
  }
}

export default GoogleMap
