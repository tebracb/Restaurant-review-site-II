import React from "react"
import FilterRatings from "./FilterRatings"
import SidebarItem from "./SidebarItem"
import "./Sidebar.css"
import OpenSidebarItem from "./OpenSidebarItem";

class Sidebar extends React.Component {
constructor(props){
    super(props)
}


    render() {
        console.log(this.props.selectedRestaurant)
        const restaurantMeta = this.props.restaurants.map(restaurant =>
            <SidebarItem
                key={restaurant.reference}
                restaurant={restaurant}
                className={this.props.selectedRestaurant === restaurant ? "selected" : null}
                setSelectedRestaurant={this.props.setSelectedRestaurant}
            />
        )


        return (

            this.props.selectedRestaurant === null ?
                <div className="sidebarDiv">
                    {/* component for the stars (for filtering ratings) */}
                    {/* giving the setRating function as a prop to the FilterRating */}
                    <span>Minimum rating:</span>
                    <FilterRatings
                        setSelectedRating={this.props.setSelectedRating}
                        selectedRating={this.props.selectedRating}
                    />
                    {restaurantMeta}
                </div>
                :
                <div className="sidebarDiv">
                    <OpenSidebarItem
                        selectedRestaurant={this.props.selectedRestaurant}
                    />
                    <button onClick={this.props.handleClick}>X</button>
                </div>



        )
    }
}

export default Sidebar