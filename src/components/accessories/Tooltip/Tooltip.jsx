import React, {
  PropTypes
} from 'react';


export default class Tooltip extends React.Component {
  render() {
    const { x, y, children } = this.props;

    if ((typeof x === 'number' || typeof x === 'string') && (typeof y === 'number' || typeof y === 'string')) {
      return (
        <div
          style={{ position: 'absolute', top: y, left: x, pointerEvents: 'none' }}
        >
          { children }
        </div>
      );
    }

    return null;
  }
}

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
