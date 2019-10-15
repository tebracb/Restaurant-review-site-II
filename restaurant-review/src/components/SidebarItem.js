import React from "react"
import "./Sidebar.css"

class SidebarItem extends React.Component {

    render() {
        
        return (
            <div className="itemDiv" onClick={() => this.props.setSelectedRestaurant(this.props.restaurant)} style={{ cursor: "pointer" }}>
                <h3> {this.props.restaurant.name}</h3>
                {/* {this.props.restaurantDetails.photos ? <img src= {this.props.restaurantDetails.photos[0].getUrl()} /> : null} */}
                <p>{this.props.restaurant.formatted_address}</p>
                <p>{`rating: ${this.props.restaurant.rating === undefined ? "no rating yet" : this.props.restaurant.rating}`}</p>
                {/* <hr className="devider" /> */}
            </div>
        
        )
    }

}


export default SidebarItem