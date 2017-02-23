import React, {
  PropTypes
} from 'react';


const Tooltip = ({ x, y, xOffset, yOffset, children }) => {
  if (typeof x === 'number' && typeof y === 'number') {
    return (
      <div
        className="yard3-tooltip"
        style={{
          position: 'absolute',
          top: y + yOffset,
          left: x + xOffset,
          pointerEvents: 'none',
          color: '#333',
          fontWeight: 'bold',
          zIndex: 9999999,
        }}
      >
        { children }
      </div>
    );
  }

  return <noscript />;
};

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
