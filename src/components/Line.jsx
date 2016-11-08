import React, {
  PropTypes
}                 from 'react';
import * as d3    from 'd3';
import {
  extractStyles
}                 from '../utils';

const Line = props => {
  const {data, xScale, yScale} = props;
  const line = d3.line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));

  const styles = extractStyles(props);

  return (
    <g>
      <path
        d={line(data)}
        {...styles}
      />
    </g>
  );
};

Line.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func
};

Line.defaultProps = {
  strokeWidth: 1,
  fill: 'transparent'
};

export default Line;
