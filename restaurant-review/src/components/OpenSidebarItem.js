import React from "react"
import Comment from "./Comment"
import SidebarInfo from "./SidebarInfo"


class OpenSidebarItem extends React.Component {
    constructor() {
        super()
    }

    render() {
        // if (!this.props.restaurantDetails.review) {
        //     return null
        // }
        // const reviews = this.props.restaurantDetails.reviews[0](comment =>
        //     <Comment
        //     comment = {comment}
        //     />
        // )

        if (!this.props.restaurantDetails) {
            return null
        }
        console.log(this.props.restaurantDetails)
            const reviews = this.props.restaurantDetails.reviews.map(review =>
                <Comment
                    key={review.author_url}
                    review={review}
                />
            )

        return (

            <div>
                <SidebarInfo 
                handleClick = {this.props.handleClick}
                selectedRestaurant = {this.props.selectedRestaurant}
                restaurantDetails = {this.props.restaurantDetails}
                />
                < hr />
                {reviews}
                
            </div>
        )
    }
}

export default OpenSidebarItem