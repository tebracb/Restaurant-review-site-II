import React from "react"
import Comment from "./Comment"
import SidebarInfo from "./SidebarInfo"


class OpenSidebarItem extends React.Component {
    constructor() {
        super()
    }

    componentDidUpdate() {
        if(this.ele) {
            this.ele.scrollTo(0, 0);
          }
    }

    render() {

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

            <div ref={(element) => { this.ele = element}}>
                <SidebarInfo
                    handleClick={this.props.handleClick}
                    selectedRestaurant={this.props.selectedRestaurant}
                    restaurantDetails={this.props.restaurantDetails}
                />
                < hr />
                {reviews}

            </div>
        )
    }
}

export default OpenSidebarItem