import React from "react"
import "./Form.css"


class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            formatted_address: ""
        }

        this.handleNameChange = (e) => {
            this.setState({
                name: e.target.value
            });
            //     console.log(this.state.name)
        }

        this.handleAddressChange = (e) => {
            this.setState({
                formatted_address: e.target.value
            });
            //     console.log(this.state.name)
        }


        this.handleSubmit = (e) => {
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
    }


    render() {
        return (
            <div className="formDiv">
                <div className="formContent">
                    <h1>Form</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name of Restaurant:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <label>
                            Address(optional):
                        <input type="text" value={this.state.formatted_address} onChange={this.handleAddressChange} />
                        </label>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>

            </div>
        )
    }
}

export default Form