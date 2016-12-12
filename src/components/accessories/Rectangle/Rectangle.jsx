import React, {
  PropTypes
} from 'react';
import {
  extractStyles,
  staticStyleTypes
} from '../../../utils/styles';
import {
  eventTypes,
  extractEvents
} from '../../../utils/events';


const Rectangle = (props, context) => {
  const { containerWidth, containerHeight } = context;
  const { x, y } = props;
  const styles = extractStyles(props);
  const events = extractEvents(props);

  const xScale = props.xScale || context.xScale;
  const yScale = props.yScale || context.yScale;

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
  xScale: PropTypes.func,
  yScale: PropTypes.func
};

Rectangle.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Rectangle;
