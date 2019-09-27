import React from "react"
import Ratings from "react-ratings-declarative"

class SidebarInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="restaurantInfoDiv">
                
                <button className="closeButton" onClick={this.props.handleClick}>X</button>
                <h2>{this.props.selectedRestaurant.name}</h2>
               
                <Ratings
                    rating={this.props.restaurantDetails.rating}
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


            <img src={`https://maps.googleapis.com/maps/api/streetview?size=300x200&location=${this.props.selectedRestaurant.geometry.location.lat()},${this.props.selectedRestaurant.geometry.location.lng()}&fov=90&heading=235&pitch=10&key=AIzaSyDbdKdJc9wSQ83SQAX9B34xJ_cydDMUQnQ&`} />
                {/* src\components\img\location.svg
            src\components\OpenSidebarItem.js */}

                <p><img className="addressIcon" src={require("./img/location-pin.png")} />{this.props.selectedRestaurant.formatted_address}</p>
                <p><img className="addressIcon" src={require("./img/call1.png")} />{this.props.restaurantDetails.formatted_phone_number}</p>
                <p><img className="addressIcon" src={require("./img/www.png")} /> <a href={this.props.restaurantDetails.website}>{this.props.restaurantDetails.website}</a></p>
            </div>
        )
    }
}


export default SidebarInfo