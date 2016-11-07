import React, {
  PropTypes
}                 from 'react';
import {
  extractStyles
}                 from '../utils';

const Rectangle = props => {
  const {xExtent, yExtent, xScale, yScale} = props;
  const [xMin, xMax] = xExtent.map(xScale);
  const [yMin, yMax] = yExtent.map(yScale);
  const styles = extractStyles(props);

  return (
    <g>
      <rect
        {...styles}
        x={xMin}
        y={yMax}
        width={xMax - xMin}
        height={yMin - yMax}
      />
    </g>
  );
};

Rectangle.propTypes = {
  xExtent: PropTypes.array.isRequired,
  yExtent: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func
};

export default Rectangle;
