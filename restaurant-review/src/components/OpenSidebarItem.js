import React from "react"

class OpenSidebarItem extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div>
            <h1>{this.props.selectedRestaurant.name}</h1>
            <p>{this.props.restaurantDetails ? this.props.restaurantDetails.rating
                    : null}</p>
            </div>
         
        )
    }
}

export default OpenSidebarItem