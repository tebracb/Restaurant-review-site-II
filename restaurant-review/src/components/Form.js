import React from "react"
import "./Form.css"


class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }

        this.handleChange = (e) => {
            this.setState({
                name: e.target.value
            });
            console.log(this.state.name)
         }

         this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.closeForm();
            this.props.getName(this.state.name)
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
                        <input type="text" value={this.state.name} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

            </div>
        )
    }
}

export default Form