import React from "react"
import "./Comment.css"
import Ratings from "react-ratings-declarative"

class Comment extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="commentText">
                <div>
                <img className="profilePhoto" src={this.props.review.profile_photo_url ? this.props.review.profile_photo_url : "/img/profilephoto.png"} />
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