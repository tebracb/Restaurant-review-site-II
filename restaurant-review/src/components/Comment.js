import React from "react"
import "./Comment.css"
import Ratings from "react-ratings-declarative"
import profilePhoto from "./img/profilephoto.png"

class Comment extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     src: profilePhoto
        // }
    }

    // componentDidMount() {

    //     if (this.props.review.profile_photo_url) {
    //         console.log("this.props.review.profile_photo_url is" + this.props.review)
    //         console.log("this.props.review.profile_photo_url === undefined" + this.props.review.profile_photo_url===undefined)
    //         this.setState({
    //             src: this.props.review.profile_photo_url
    //         })
    //     }
    // }

        // handleError = (e) => {
        //     this.setState({
        //         src: profilePhoto
        //     })
        // }

        handleError = (e) => {
            e.target.src = profilePhoto
        }

        render() {

            return (
                <div className="commentDiv">
                    <div>
                        <img onError={this.handleError} className="profilePhoto" alt="user avatar" src={this.props.review.profile_photo_url ? this.props.review.profile_photo_url : profilePhoto} />
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
                    {/* <hr /> */}
                </div>
            )
        }
    }


    export default Comment