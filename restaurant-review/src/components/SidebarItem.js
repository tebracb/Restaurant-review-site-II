import React from "react"
import "./Sidebar.css"

class SidebarItem extends React.Component{
constructor(props){
super(props)
}

render(){
    return(
        <div>
        <h3 className = {this.props.className}>{this.props.restaurant.restaurantName}</h3>
        <p>{this.props.restaurant.address}</p>
        <p>{`rating:${this.props.restaurant.ratings[0].stars}`}</p>
        <hr />
        </div>
    )
}


}

export default SidebarItem