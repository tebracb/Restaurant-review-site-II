import React from "react"
import FilterRatings from "./FilterRatings"
import SidebarItem from "./SidebarItem"
import "./Sidebar.css"
import OpenSidebarItem from "./OpenSidebarItem";

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const restaurantMeta = this.props.restaurants.map(restaurant =>
            <SidebarItem
                key={restaurant.reference}
                restaurant={restaurant}
                restaurantDetails={this.props.restaurantDetails}
                setSelectedRestaurant={this.props.setSelectedRestaurant}
            />
        )

        return (
        

            this.props.selectedRestaurant === null ?
                <div className="sidebarDiv">
                    {/* component for the stars (for filtering ratings) */}
                    <span>Minimum rating:</span>
                    <div className="ratingsDiv">
                    <FilterRatings
                        setSelectedRating={this.props.setSelectedRating}
                        selectedRating={this.props.selectedRating}
                    />
                    </div>
                    {restaurantMeta}
                </div>
                :
                <div className="sidebarDiv">
                    <OpenSidebarItem
                        selectedRestaurant={this.props.selectedRestaurant}
                        restaurantDetails={this.props.restaurantDetails}
                        handleCloseClick={this.props.handleCloseClick}
                        addNewReview={this.props.addNewReview}
                    />

                </div>
        )
    }
}

export default Sidebar