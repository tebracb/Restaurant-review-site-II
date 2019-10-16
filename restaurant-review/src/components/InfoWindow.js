import React from "react"
import "./InfoWindow.css"
import Ratings from "react-ratings-declarative"
import placeholder from "./img/restaurant-placeholder.jpg"


class InfoWindow extends React.Component {

    handleError = (e) => {
        e.target.src = placeholder
    }


    render() {

        return (
            <div className="infoDiv">

                <div className="photoDiv">
                    <img onError={this.handleError} alt="Restaurant" className="infoPhoto" src={this.props.imgSrc ? this.props.imgSrc : placeholder} />
                </div>


                <div>
                    <p className="restName" >{this.props.name}</p>

                    <Ratings
                        rating={this.props.rating}
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
            </div>
        )
    }
}

export default InfoWindow