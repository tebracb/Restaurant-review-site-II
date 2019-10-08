import React from "react"

class NewReviewForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            text: ""
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
                text: this.state.text
            }
            this.props.addNewReview(newReview);
            this.props.closeReviewForm()

        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <br />
                <label>
                    Review:
            <textarea value={this.state.text} onChange={this.handleReviewChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default NewReviewForm