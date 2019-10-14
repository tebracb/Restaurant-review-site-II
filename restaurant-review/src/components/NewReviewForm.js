import React from "react"
import Ratings from "react-ratings-declarative"
import "./NewReviewForm.css"

class NewReviewForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            text: "",
            rating: 0,

            touched: {
                name: false,
                text: false
            }
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

        this.handleBlur = field => (e) => {
            this.setState({
                touched: { ...this.state.touched, [field]: true }
            });
        };

        this.canBeSubmitted = () => {
            const errors = this.validate(this.state.name, this.state.text);
            const isDisabled = Object.keys(errors).some(x => errors[x]);
            return !isDisabled;
        }

        this.handleSubmit = (e) => {
            //don't submit if form is not valid
            if (!this.canBeSubmitted()) {
                e.preventDefault();
                return;
            }

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

        this.validate = (name, text) => {
            // true means invalid, so our conditions got reversed
            return {
                name: name.length === 0,
                text: text.length === 0
            };
        }
    }



    render() {

        const errors = this.validate(this.state.name, this.state.text);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const showError = this.state.touched[field];

            return hasError ? showError : false;
        };

        return (
            <form onSubmit={this.handleSubmit}>
                <label className="reviewLabel">
                    Name:
            <input type="text"
                        className={`reviewInput ${shouldMarkError("name") ? "error" : ""}`}
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        onBlur={this.handleBlur("name")}
                        required />
                </label>
                <br />
                <label className="reviewLabel" >
                    Review:
            <textarea value={this.state.text}
                        className={`reviewInput ${shouldMarkError("text") ? "error" : ""}`}
                        onChange={this.handleReviewChange}
                        onBlur={this.handleBlur("text")}
                        required />
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
                    <button disabled={isDisabled} className="submitButton" type="submit" value="Submit">Submit</button>
                </div>
            </form>
        )
    }
}

export default NewReviewForm