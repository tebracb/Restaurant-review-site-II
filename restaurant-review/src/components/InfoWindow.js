import React from "react"
import "./InfoWindow.css"
import Ratings from "react-ratings-declarative"


class InfoWindow extends React.Component {
    constructor() {
        super()
    }


    // createPanorama = () => {
    //     new window.google.maps.StreetViewPanorama({

    //           position:
    //            {lat: this.props.lat, 
    //             lng: this.props.lng},
    //           })

    // }

    render() {


        return (
            <div className="infoDiv">
                <div className="photoDiv">
                    <img className="infoPhoto" src={this.props.imgSrc} />
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