import React, {
  PropTypes
}                 from 'react';
import {
  extractStyles,
  staticStyleTypes,
}                 from '../../utils/styles';
import {
  eventTypes,
  extractEvents
}                from '../../utils/events';


const Rectangle = props => {
  const {x, y, xScale, yScale, containerWidth, containerHeight} = props;
  const styles = extractStyles(props);
  const events = extractEvents(props);

  xScale.rangeRound([0, containerWidth]);
  yScale.rangeRound([containerHeight, 0]);

  const [xMin, xMax] = x.map(xScale);
  const [yMin, yMax] = y.map(yScale);

  return (
    <g>
      <rect
        {...styles}
        {...events}
        x={xMin}
        y={yMax}
        width={xMax - xMin}
        height={yMin - yMax}
      />
    </g>
  );
};

Rectangle.propTypes = {
  ...staticStyleTypes,
  ...eventTypes,
  x: PropTypes.array.isRequired,
  y: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
};

export default Rectangle;
