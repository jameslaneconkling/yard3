import React, {
  PropTypes
}                 from 'react';
import {
  extractStyles,
  stylePropTypes,
}                 from '../../utils/style';

const Rectangle = props => {
  const {x, y, xScale, yScale} = props;
  const [xMin, xMax] = x.map(xScale);
  const [yMin, yMax] = y.map(yScale);
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
  ...stylePropTypes,
  x: PropTypes.array.isRequired,
  y: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
};

export default Rectangle;
