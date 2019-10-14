import React from "react"
import "./NewRestaurantForm.css"


class NewRestaurantForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            formatted_address: "",

            touched: {
                name: false
            }
        }

        this.handleNameChange = (e) => {
            this.setState({
                name: e.target.value
            });
        }

        this.handleAddressChange = (e) => {
            this.setState({
                formatted_address: e.target.value
            });
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
            let newRestaurant = {
                name: this.state.name,
                geometry: {
                    location: {
                        lat: this.props.newRestaurantLat,
                        lng: this.props.newRestaurantLng
                    }
                },
                photos: [
                    {

                    }
                ],
                reviews: [],
                formatted_address: this.state.formatted_address,
                reference: `${this.props.newRestaurantLat}${this.props.newRestaurantLng}`
            }


            this.props.closeForm();
            this.props.addNewRestaurant(newRestaurant)
        }

        this.validate = (name) => {
            // true means invalid, so our conditions got reversed
            return {
                name: name.length === 0
            };
        }

        this.closeForm = () => {
            this.props.closeForm();
        }

    }


    render() {

        const errors = this.validate(this.state.name);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const showError = this.state.touched[field];

            return hasError ? showError : false;
        };

        return (
            <div className="formDiv">
                <div className="formContent">
                    <h2>Add a new restaurant:</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="fields">
                            <label>
                                Name of restaurant:
                        <input className={`input ${shouldMarkError("name") ? "error" : ""}`}
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                    onBlur={this.handleBlur("name")}
                                    required />
                            </label>
                            <br />
                            <label>
                                Address(optional):
                        <input className="input"
                                    type="text"
                                    value={this.state.formatted_address}
                                    onChange={this.handleAddressChange}
                                />

                            </label>
                        </div>
                        <br />
                        <div className="buttonDiv">
                            <button disabled={isDisabled} className="button" type="submit" value="Submit">Submit</button>
                            <button className="button" onClick={this.closeForm}>Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default NewRestaurantForm