import React from "react"

class OpenSidebarItem extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <h1>{this.props.selectedRestaurant.name}</h1>
         
        )
    }
}

export default OpenSidebarItem