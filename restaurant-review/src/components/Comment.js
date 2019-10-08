import React from "react"
import "./Comment.css"
import Ratings from "react-ratings-declarative"
import profilePhoto from "./img/profilephoto.png"

class Comment extends React.Component {
    constructor(props) {
        super(props)

        this.src = this.props.review.profile_photo_url ? this.props.review.profile_photo_url : profilePhoto
    }

    handleError = (e) => {
        this.src=profilePhoto
    }


    render() {
        return (
            <div className="commentText">
                <div>
                <img onError={this.handleError} className="profilePhoto" src={this.src} />
                    <p>{this.props.review.author_name}</p>
                    
                     <Ratings
                        rating={this.props.review.rating}
                        widgetDimensions="20px"
                        widgetSpacings="2px"
                        widgetRatedColors="#FFD300"
                    >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                    </Ratings>

                </div>

               

                <div>
                    <p>{this.props.review.text}</p>
                </div>
                <hr />
            </div>
        )
    }
}


export default Comment