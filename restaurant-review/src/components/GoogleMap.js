import React, { Component } from 'react'
import InfoWindow from "./InfoWindow.js"
import ReactDOMServer from 'react-dom/server';
import "./GoogleMap.css"


const mapStyles = {
  map: {
    position: 'absolute',
    width: '78%',
    height: '100%',
    mapTypeId: window.google.maps.MapTypeId.ROADMAP
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

    this.infoWindow = new window.google.maps.InfoWindow({
      width: 600
    });

    this.request = {
      location: this.props.options.center,
      radius: '100',
      types: ["restaurant"]
      // keyword: "restaurant"
    };

    // this.defaultImg = 
    // if (this.props.)

    // require("./img/restaurant.png")

  }

  getPlaceDetail = (placeId) => {
    const placeRequest = {
      placeId: placeId,
      fields: ['name', 'rating', 'reviews', 'place_id', 'formatted_phone_number', 'website']
    };

    const service = new window.google.maps.places.PlacesService(this.map);
    service.getDetails(placeRequest, this.placeCallback)
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
      // console.log(results)
      //put results to App via props (callback from child to parent)

      //filtering out results which don't have photo or ratings
      let validResults = results.filter((result) => {
        if (result.photos || result.rating !== 0) {
          return result
        }
      })
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

    var bounds = this.map.getBounds();
    let ne = bounds.getNorthEast();
   let sw = bounds.getSouthWest();
    // console.log(ne,sw)

    //    window.google.maps.event.addListener = (this.map, 'bounds_changed', () => {
    //     let bounds =  this.map.getBounds();
    //     let ne = bounds.getNorthEast();
    //     let sw = bounds.getSouthWest();
    //     console.log(bounds)
    //     //do whatever you want with those bounds
    // });
    // this.map.addListener = (this.map, 'idle', () => {
    // console.log(this.map.getBounds())
    // })
    this.props.restaurants.forEach(restaurant => {

      
      if (restaurant.marker === undefined) {
        // console.log(restaurant)
        let markerOptions = {

          position:
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

        // let imgSrc = 
        //   if (typeof restaurant.photos[0].getUrl === "function"){
        //   restaurant.photos[0].getUrl()
        //   } else{
        //      restaurant.photos[0]
        //   }
        // } null
        

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

      //if marker or SidebarItem click changes selectedRestaurant API gets details of new selectedRestaurant
      // and it's displayed in Sidebar

      if (this.props.selectedRestaurant && (prevProps.selectedRestaurant !== this.props.selectedRestaurant)) {
        this.getPlaceDetail(this.props.selectedRestaurant.place_id)
      }


      if (this.props.selectedRestaurant === restaurant) {
        restaurant.marker.setIcon(selectedMarker.URL);

      } else {
        restaurant.marker.setIcon(defaultImg.URL)
        //restaurant.marker.setIcon(require("./img/restaurantmarker.svg"))
      }

      restaurant.marker.setVisible(true)

      // this.map.addListener = (this.map, 'idle', () => {
      //   if(this.map.getBounds().contains(restaurant.marker.getPosition())) {
      //     console.log("contains")
      //    }
      //   })

    })

  

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

      </div>
    );
  }
}

export default GoogleMap
