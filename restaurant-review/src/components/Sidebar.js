import React from "react"
import FilterRatings from "./FilterRatings"
import SidebarItem from "./SidebarItem"
import "./Sidebar.css"

class Sidebar extends React.Component {

    render() {
        const restaurantMeta = this.props.restaurants.map(restaurant =>
            <SidebarItem
                key={restaurant.formatted_address}
                restaurant={restaurant}
                className={this.props.selectedRestaurant === restaurant ? "selected" : null}
            />
        )

        return (
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
        )
    }
}

export default Sidebar