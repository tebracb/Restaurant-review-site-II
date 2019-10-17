import React from "react";
import Ratings from "react-ratings-declarative"


class FilterRatings extends React.Component {

  render() {
    return (
      <div>

        <Ratings
          rating={this.props.selectedRating}
          widgetHoverColor="#FFD300"
          widgetRatedColors="#D4AF37"
          changeRating={this.props.setSelectedRating}
          widgetDimensions="30px"
        >
          <Ratings.Widget widgetHoverColor="#FFD300" />
          <Ratings.Widget widgetHoverColor="#FFD300" />
          <Ratings.Widget widgetHoverColor="#FFD300" />
          <Ratings.Widget widgetHoverColor="#FFD300" />
          <Ratings.Widget widgetHoverColor="#FFD300" />
        </Ratings>
      </div>
    );
  }
}


export default FilterRatings