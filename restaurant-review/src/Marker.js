import React from "react"

class Marker extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            new window.google.maps.Marker({
               position: {
                lat: this.props.lat,
                lng: this.props.long},
                map: this.googleMap
    })
        )
}
}


export default Marker