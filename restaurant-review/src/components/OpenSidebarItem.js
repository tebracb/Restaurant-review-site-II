import React from "react"
import Comment from "./Comment"
import SidebarInfo from "./SidebarInfo"
import NewReviewForm from "./NewReviewForm"


class OpenSidebarItem extends React.Component {
    constructor() {
        super()
        this.state = {
            showReviewForm: false
        }
    }

    handleClick = () => {
        this.setState({
            showReviewForm: !this.state.showReviewForm
        })
    }

    closeReviewForm = () => {
        this.setState({
            showReviewForm: false
        })
    }

    render() {

        let reviews = "";

        // if restaurant's source is API, and there are reviews: show reviews
        if (this.props.selectedRestaurant.place_id) {
            // restaurant's source is API 
            if (this.props.restaurantDetails) {
                reviews = this.props.restaurantDetails.reviews.map(review =>
                    <Comment
                        key={review.author_url}
                        review={review}
                    />
                )
            } else {
                // if restaurant's source is API, and reviews are not there yet: "Loading reviews"
                reviews = <h2>Loading reviews...</h2>
            }
        } else {
            // restaurant souce is JSON or NEW
            if (this.props.selectedRestaurant.reviews.length !== 0) {
                reviews = this.props.selectedRestaurant.reviews.map(review =>
                    <Comment
                        key={review.author_name}
                        review={review}
                    />
                )
            } else {
                reviews = <h2>No reviews yet</h2>
            }
        }


        return (

            <div>
                <SidebarInfo
                    handleCloseClick={this.props.handleCloseClick}
                    selectedRestaurant={this.props.selectedRestaurant}
                    restaurantDetails={this.props.restaurantDetails}
                />
                < hr />
                <button onClick={this.handleClick}>Add Review</button>
                {this.state.showReviewForm ?
                <div>
                    <NewReviewForm 
                    addNewReview={this.props.addNewReview}
                    closeReviewForm={this.closeReviewForm}
                    />
                </div>
                : null}
                {reviews}

            </div>
        )
    }
}

export default OpenSidebarItem