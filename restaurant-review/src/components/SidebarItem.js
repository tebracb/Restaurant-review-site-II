import React from "react"
import "./Sidebar.css"

class SidebarItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovered: false
        }
    }
    hoverOn = () => {
        this.setState({
            hovered: true
        })
    }

    hoverOff = () => {
        this.setState({
            hovered: false
        });
    }

    render() {
        return (
            <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} className={this.state.hovered ? "selected" : null}
                onClick={() => this.props.setSelectedRestaurant(this.props.restaurant)} style={{ cursor: "pointer" }}>
                <h3> {this.props.restaurant.name}</h3>
                <p>{this.props.restaurant.formatted_address}</p>
                <p>{`rating:${this.props.restaurant.rating}`}</p>
                <hr />
            </div>
        )
    }

}


export default SidebarItem