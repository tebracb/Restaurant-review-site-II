import React from "react"
import Ratings from "react-ratings-declarative"
import "./NewReviewForm.css"

class NewReviewForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            text: "",
            rating: 0
        }
    

        this.handleNameChange = (e) => {
            this.setState({
                name: e.target.value
            });
        }

        this.handleReviewChange = (e) => {
            this.setState({
                text: e.target.value
            })
        }

        this.handleSubmit = (e) => {
            e.preventDefault();

            let newReview = {
                author_name: this.state.name,
                text: this.state.text,
                rating: this.state.rating
            }
            this.props.addNewReview(newReview);
            this.props.closeReviewForm()
        }

        this.changeRating = newRating => {
            this.setState({
              rating: newRating
            });
    }
}

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label className="reviewLabel">
                    Name:
            <input type="text" className="reviewInput" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <br />
                <label className="reviewLabel" >
                    Review:
            <textarea value={this.state.text} className="reviewInput" onChange={this.handleReviewChange} />
                </label>
                <br />
                
                <div className="reviewRatingsDiv">
                <Ratings
                    rating={this.state.rating}
                    widgetHoverColor="#FFD300"
                    widgetRatedColors="#D4AF37"
                    changeRating={this.changeRating}
                    widgetDimensions="30px"
                >
                    <Ratings.Widget widgetHoverColor="#FFD300" />
                    <Ratings.Widget widgetHoverColor="#FFD300" />
                    <Ratings.Widget widgetHoverColor="#FFD300" />
                    <Ratings.Widget widgetHoverColor="#FFD300" />
                    {/* widgetHoverColor="black"  */}
                    <Ratings.Widget widgetHoverColor="#FFD300" />
                </Ratings>
                </div>
               
                <div className="submitButtonDiv">
                <button className="submitButton" type="submit" value="Submit">Submit</button> 
                </div>
            </form>
        )
    }
}

export default NewReviewForm