import React from "react";
import Ratings from "../react-ratings-declarative"


class FilterRatings extends React.Component {
   constructor(props){
    super(props)
    // this.state = {
    //     rating: 0
    // }
 
}
    // changeRating = (newRating) => {
    //   this.setState({
    //     rating: newRating
    //   });
    //   console.log(newRating)
    // }


    render() {
      return (
          <div style={{textAlign: "right"}}>
          
          <Ratings 
            rating={this.props.selectedRating}
            widgetHoverColor="#FFD300"
            widgetRatedColors="#D4AF37"
            changeRating={this.props.setSelectedRating}
            widgetDimensions="30px"
          >
            <Ratings.Widget widgetHoverColor="#FFD300"/>
            <Ratings.Widget widgetHoverColor="#FFD300"/>
            <Ratings.Widget widgetHoverColor="#FFD300"/>
            <Ratings.Widget widgetHoverColor="#FFD300"/>
            {/* widgetHoverColor="black"  */}
            <Ratings.Widget widgetHoverColor="#FFD300"/>
          </Ratings>
          </div>
      
    

    // <div style={{textAlign: "right"}}>
    //   <Ratings 
    //     rating={3.403}
    //     widgetDimensions="30px"
    //     widgetSpacings="15px"
    //   >
    //     <Ratings.Widget widgetRatedColor="green" />
    //     <Ratings.Widget widgetSpacing="30px" widgetDimension="15px" />
    //     <Ratings.Widget widgetRatedColor="black" />
    //     <Ratings.Widget widgetRatedColor="rebeccapurple" />
    //     <Ratings.Widget />
    //   </Ratings>
    //   </div>
    );
  }
}


export default FilterRatings