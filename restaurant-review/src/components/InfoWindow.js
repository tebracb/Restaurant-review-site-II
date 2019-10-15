import React from "react"
import "./InfoWindow.css"
import Ratings from "react-ratings-declarative"


class InfoWindow extends React.Component {


    render() {

        return (
            <div className="infoDiv">

                {this.props.imageAvailable ?

                    <div className="photoDiv">
                        <img alt="Restaurant" className="infoPhoto" src={this.props.imgSrc} />
                    </div>
                    : null}


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