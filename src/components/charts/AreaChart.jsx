import React, { PropTypes } from 'react';
import * as d3 from 'd3';

const AreaChart = ({ containerWidth, containerHeight, xScale, yScale, children, x0, x1, y0, y1, data }) => {
  xScale.rangeRound([0, containerWidth]);
  yScale.rangeRound([containerHeight, 0]);

  // TODO - this could be more elegant if composed
  const area = d3.area();

  if (x1) {
    area
      .x0(d => xScale(x0(d)))
      .x1(d => xScale(x1(d)));
  } else {
    area
      .x0(d => xScale(x0(d)));
  }

  if (y1) {
    area
      .y0(d => yScale(y0(d)))
      .y1(d => yScale(y1(d)));
  } else {
    area
      .y0(d => yScale(y0(d)))
      .y1(containerHeight);
  }

  return (
    <g>
      <path
        d={area(data)}
        className='area'
      />
      { React.Children.map(children, child => React.cloneElement(child, {containerWidth, containerHeight})) }
    </g>
  );
};

AreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x0: PropTypes.func.isRequired,
  x1: PropTypes.func,
  y0: PropTypes.func.isRequired,
  y1: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number
};

AreaChart.defaultProps = {
  x0: d => d.key,
  y0: d => d.value
};

export default AreaChart;
