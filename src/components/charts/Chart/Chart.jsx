import React, {
  PropTypes
} from 'react';
import {
  eventTypes,
  extractEvents
} from '../../../utils/events';


export default class Chart extends React.Component {
  render() {
    const { width, height, bottomMargin, topMargin, leftMargin, rightMargin } = this.props;
    const containerWidth = width - leftMargin - rightMargin;
    const containerHeight = height - topMargin - bottomMargin;
    const events = extractEvents(this.props);

    return (
      <svg
        {...events}
        ref={(el) => { this.svg = el; }}
        width={width}
        height={height}
        className="chart"
      >
        <g
          transform={`translate(${leftMargin},${topMargin})`}
        >
          { React.Children.map(this.props.children, child =>
            React.cloneElement(child, { containerWidth, containerHeight })
          ) }
        </g>
      </svg>
    );
  }
}

Chart.propTypes = {
  ...eventTypes,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  topMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  bottomMargin: PropTypes.number,
  leftMargin: PropTypes.number
};

Chart.defaultProps = {
  topMargin: 20,
  rightMargin: 20,
  bottomMargin: 30,
  leftMargin: 40
};
