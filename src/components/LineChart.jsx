import React, { PropTypes } from 'react';
import * as d3 from 'd3';

const LineChart = ({ containerWidth, containerHeight, xScale, yScale, children, x, y, data }) => {
  xScale.rangeRound([0, containerWidth]);
  yScale.rangeRound([containerHeight, 0]);

  const line = d3.line()
    .x(d => xScale(x(d)))
    .y(d => yScale(y(d)))(data);

  return (
    <g>
      <path
        d={line}
        className='line'
      />
      { React.Children.map(children, child => React.cloneElement(child, {containerWidth, containerHeight})) }
    </g>
  );
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  topMargin: PropTypes.number,
  bottompMargin: PropTypes.number,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number,
};

LineChart.defaultProps = {
  x: d => d.key,
  y: d => d.value
};

export default LineChart;
