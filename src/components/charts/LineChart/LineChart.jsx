import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import {
  extractStyles,
  staticStyleTypes
} from '../../../utils/styles';
import {
  eventTypes,
  extractEvents
} from '../../../utils/events';


const LineChart = (props) => {
  const { containerWidth, containerHeight, xScale, yScale, children, x, y, data } = props;
  const styles = extractStyles(props);
  const events = extractEvents(props);

  xScale.rangeRound([0, containerWidth]);
  yScale.rangeRound([containerHeight, 0]);

  const line = d3.line()
    .x(d => xScale(x(d)))
    .y(d => yScale(y(d)))(data);

  return (
    <g>
      <path
        {...styles}
        {...events}
        d={line}
        className="line"
      />
      { React.Children.map(children, child =>
        React.cloneElement(child, { containerWidth, containerHeight })
      ) }
    </g>
  );
};

LineChart.propTypes = {
  ...staticStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  fill: PropTypes.string                  // a sane style default to prevent line from having a fill; propbably don't overwrite
};

LineChart.defaultProps = {
  x: d => d.key,
  y: d => d.value,
  fill: 'none'
};

export default LineChart;
