import React from "react"
import Comment from "./Comment"

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
   
            const reviews = this.props.restaurantDetails.reviews.map(review =>
                <Comment
                    key={review.author_url}
                    review={review}
                />
            )

        return (

            <div>
                <h1>{this.props.selectedRestaurant.name}</h1>
                <p>{this.props.restaurantDetails.rating}</p>
                {reviews}
                
            </div>
        )
    }
}

export default OpenSidebarItem