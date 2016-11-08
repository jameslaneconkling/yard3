import React, { PropTypes } from 'react';
import * as d3 from 'd3';

const AreaChart = ({ containerWidth, containerHeight, xScale, yScale, children, x, x0, x1, y, y0, y1, data }) => {
  xScale.rangeRound([0, containerWidth]);
  yScale.rangeRound([containerHeight, 0]);

  // TODO - this could be more elegant if composed
  const area = d3.area();

  if (x) {
    area.x(d => xScale(x(d)));
  } else if (x0 && x1) {
    area
      .x0(d => xScale(x0(d)))
      .x1(d => xScale(x1(d)));
  }

  if (y) {
    area
      .y(d => yScale(y(d)))
      .y1(containerHeight);
  } else if (y0 && y1) {
    area
      .y0(d => yScale(y0(d)))
      .y1(d => yScale(y1(d)));
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
  x: PropTypes.func,
  x0: PropTypes.func,
  x1: PropTypes.func,
  y: PropTypes.func,
  y0: PropTypes.func,
  y1: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  topMargin: PropTypes.number,
  bottompMargin: PropTypes.number,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number,
};

export default AreaChart;
