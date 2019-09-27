import React from "react"
import Ratings from "react-ratings-declarative"

class SidebarInfo extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="restaurantInfoDiv">
            <button onClick={this.props.handleClick} style={{float: "right"}}>X</button>
           
            <h1>{this.props.selectedRestaurant.name}</h1>
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
            
            {/* src\components\img\location.svg
            src\components\OpenSidebarItem.js */}
           
            <p><img className="addressIcon" src= {require("./img/location.png")} />{this.props.selectedRestaurant.formatted_address}</p>
            <p><img className="addressIcon" src= {require("./img/call.png")} />{this.props.restaurantDetails.formatted_phone_number}</p>
            </div>
        )
    }
}


export default SidebarInfo