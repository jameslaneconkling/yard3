import React, {
  PropTypes
} from 'react';
import {
  eventTypes,
  extractEvents
} from '../../../utils/events';
import {
  styleTypes,
  extractStyles
} from '../../../utils/styles';


export default class Chart extends React.Component {
  getChildContext() {
    const {
      xScale,
      yScale,
      width,
      leftMargin,
      rightMargin,
      height,
      topMargin,
      bottomMargin
    } = this.props;

    return {
      xScale,
      yScale,
      containerWidth: width - leftMargin - rightMargin,
      containerHeight: height - topMargin - bottomMargin,
      leftMargin,
      rightMargin,
      topMargin,
      bottomMargin,
    };
  }

  render() {
    const { width, height, topMargin, leftMargin } = this.props;
    const events = extractEvents(this.props);
    const styles = extractStyles(this.props);

    return (
      <svg
        {...styles}
        {...events}
        ref={(el) => {
          this.svg = el;
        }}
        width={width}
        height={height}
        className="chart"
      >
        <g
          transform={`translate(${leftMargin},${topMargin})`}
        >
          {this.props.children}
        </g>
      </svg>
    );
  }
}

Chart.propTypes = {
  ...eventTypes,
  ...styleTypes,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  topMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rightMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottomMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  leftMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  xScale: PropTypes.func,
  yScale: PropTypes.func
};

Chart.defaultProps = {
  topMargin: 20,
  rightMargin: 20,
  bottomMargin: 30,
  leftMargin: 40
};

Chart.childContextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  topMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  bottomMargin: PropTypes.number,
  leftMargin: PropTypes.number
};
