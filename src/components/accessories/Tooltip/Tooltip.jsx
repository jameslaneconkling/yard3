import React, {
  PropTypes
} from 'react';


const Tooltip = ({ x, y, children }) => (
  (typeof x === 'number' || typeof x === 'string') &&
  (typeof y === 'number' || typeof y === 'string') ?
    <div
      style={{ position: 'absolute', top: y, left: x, pointerEvents: 'none' }}
    >
      { children }
    </div>
  : null
);

Tooltip.propTypes = {
  x: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  y: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  children: PropTypes.node
};
