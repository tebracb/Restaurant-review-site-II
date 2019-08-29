import React from "react"

class RestaurantMarker extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            new window.google.maps.Marker({
                position: {
                    lat: this.props.lat,
                    lng: this.props.long
                },
                map: this.props
            })
        )
    }
}


export default RestaurantMarker