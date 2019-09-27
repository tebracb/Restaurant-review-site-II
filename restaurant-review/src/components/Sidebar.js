import React from "react"
import FilterRatings from "./FilterRatings"
import SidebarItem from "./SidebarItem"
import "./Sidebar.css"
import OpenSidebarItem from "./OpenSidebarItem";

class Sidebar extends React.Component {
constructor(props){
    super(props)
}

//getplaceDetails = (placeID) => {
 //   https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyDbdKdJc9wSQ83SQAX9B34xJ_cydDMUQnQ&
//}

    render() {
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
                        restaurantDetails={this.props.restaurantDetails}
                        handleClick = {this.props.handleClick}
                    />
                   
                </div>
        )
    }
}

export default Sidebar