import React from "react"
import Ratings from "react-ratings-declarative";
import ReactDOM from "react-dom";
import ReactStreetview from './MyReactStreetview';

class SidebarInfo extends React.Component {

    componentDidUpdate() {
        ReactDOM.findDOMNode(this).scrollIntoView();
    }

    render() {

        if (this.props.selectedRestaurant) {
            this.position = {
                lat: typeof this.props.selectedRestaurant.geometry.location.lat === "function" ? this.props.selectedRestaurant.geometry.location.lat() : this.props.selectedRestaurant.geometry.location.lat,
                lng: typeof this.props.selectedRestaurant.geometry.location.lng === "function" ? this.props.selectedRestaurant.geometry.location.lng() : this.props.selectedRestaurant.geometry.location.lng
            }
        }

        const streetViewPanoramaOptions = {
            position: this.position,
            pov: { heading: 100, pitch: 0 },
            zoom: 1,
            addressControl: false,
            scrollwheel: false,
            motionTracking: false,
            motionTrackingControl: false,
            streetViewControl: false,
            disableDefaultUI: true
        };

        const googleMapsApiKey = 'AIzaSyDbdKdJc9wSQ83SQAX9B34xJ_cydDMUQnQ&';

        return (
            <div className="restaurantInfoDiv">
                <div className="restaurantName">
                    <button className="closeButton" onClick={this.props.handleCloseClick}>X</button>
                    <h2>{this.props.selectedRestaurant.name}</h2>

                    <Ratings
                        rating={this.props.selectedRestaurant.rating}
                        widgetDimensions="20px"
                        widgetSpacings="2px"
                        widgetRatedColors="#FFD300"
                    >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                    </Ratings>
                </div>

                {/* Static Street View Version */}
                {/* <img alt="Google Street View" src={`https://maps.googleapis.com/maps/api/streetview?size=300x200&location=${this.position.lat},${this.position.lng}&fov=90&heading=235&pitch=10&key=AIzaSyDbdKdJc9wSQ83SQAX9B34xJ_cydDMUQnQ&`} /> */}

                <div style={{
                    width: '400px',
                    height: '250px'
                }}>
                    <ReactStreetview
                        apiKey={googleMapsApiKey}
                        streetViewPanoramaOptions={streetViewPanoramaOptions}
                    />
                </div>



                <p><img alt="location icon" className="addressIcon" src={require("./img/location-pin.png")} />{this.props.selectedRestaurant.formatted_address}</p>
                {this.props.selectedRestaurant.place_id && this.props.restaurantDetails ?
                    <div>
                        <p><img alt="phone icon" className="addressIcon" src={require("./img/call1.png")} />{this.props.restaurantDetails.formatted_phone_number}</p>
                        <p><img alt="website icon" className="addressIcon siteIcon" src={require("./img/www.png")} /><span><a href={this.props.restaurantDetails.website}>{this.props.restaurantDetails.website}</a></span></p>
                    </div>
                    : null}
            </div>
        )
    }
}


export default SidebarInfo