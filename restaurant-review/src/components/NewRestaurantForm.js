import React from "react"
import "./NewRestaurantForm.css"


class NewRestaurantForm extends React.Component {
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
        }

        this.handleAddressChange = (e) => {
            this.setState({
                formatted_address: e.target.value
            });
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

        this.closeForm =() => {
            this.props.closeForm();
        }

    }


    render() {
        return (
            <div className="formDiv">
                <div className="formContent">
                    <h1>Add a new restaurant:</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="fields">
                        <label>
                            Name of restaurant:
                        <input className="input" type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <br />
                        <label>
                            Address(optional):
                        <input className="input" type="text" value={this.state.formatted_address} onChange={this.handleAddressChange} />
                        
                        </label>
                        </div>
                        <br />
                        <div className="buttonDiv">
                        <input className="button" type="submit" value="Submit" />
                        <button className="button" onClick={this.closeForm}>Cancel</button> 
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default NewRestaurantForm