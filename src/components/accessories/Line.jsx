import React, {
  PropTypes
}                 from 'react';
import * as d3    from 'd3';
import {
  extractStyles,
  staticStyleTypes,
}                          from '../../utils/style';

const Line = props => {
  const {data, xScale, yScale, containerWidth, containerHeight} = props;
  const styles = extractStyles(props);

  xScale.rangeRound([0, containerWidth]);
  yScale.rangeRound([containerHeight, 0]);

  const line = d3.line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));

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
  ...staticStyleTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
};

Line.defaultProps = {
  fill: 'none',
  stroke: '#000'
};

export default Line;
