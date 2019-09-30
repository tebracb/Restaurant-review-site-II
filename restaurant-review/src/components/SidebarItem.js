import React from "react"
import "./Sidebar.css"

class SidebarItem extends React.Component{
constructor(props){
super(props)
}


render(){
    return(
        <div onClick={() => this.props.setSelectedRestaurant(this.props.restaurant)} style={{cursor:"pointer"}}>
        <h3 className = {this.props.className}>{this.props.restaurant.name}</h3>
        <p>{this.props.restaurant.formatted_address}</p>
        <p>{`rating:${this.props.restaurant.rating}`}</p>
        <hr />
        </div>
    )
}


}

export default SidebarItem