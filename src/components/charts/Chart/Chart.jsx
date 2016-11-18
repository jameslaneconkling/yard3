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
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  topMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rightMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottomMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  leftMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Chart.defaultProps = {
  topMargin: 20,
  rightMargin: 20,
  bottomMargin: 30,
  leftMargin: 40
};
