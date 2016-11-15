import React, {
  PropTypes
} from 'react';
import * as d3 from 'd3';
import {
  extractStyles,
  staticStyleTypes
} from '../../../utils/styles';
import {
  eventTypes,
  extractEvents
} from '../../../utils/events';


const Line = (props) => {
  const { data, xScale, yScale, containerWidth, containerHeight } = props;
  const styles = extractStyles(props);
  const events = extractEvents(props);

  xScale.rangeRound([0, containerWidth]);
  yScale.rangeRound([containerHeight, 0]);

  const line = d3.line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));

  return (
    <g>
      <path
        {...styles}
        {...events}
        d={line(data)}
      />
    </g>
  );
};

Line.propTypes = {
  ...staticStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
};

Line.defaultProps = {
  fill: 'none',
  stroke: '#000'
};

export default Line;
