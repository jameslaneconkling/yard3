import React, {
  PropTypes
} from 'react';


const Tooltip = ({ x, y, xOffset, yOffset, children }) => (
  (typeof x === 'number' || typeof x === 'string') &&
  (typeof y === 'number' || typeof y === 'string') ?
    <div
      style={{
        position: 'absolute',
        top: y + yOffset,
        left: x + xOffset,
        pointerEvents: 'none'
      }}
    >
      { children }
    </div>
  : <noscript />
);

Tooltip.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  children: PropTypes.node
};

Tooltip.defaultProps = {
  xOffset: 0,
  yOffset: 0
};

export default Tooltip;
