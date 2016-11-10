import { PropTypes } from 'react';

export const stylePropTypes = {
  opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  fillOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  strokeOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  strokeLinecap: PropTypes.oneOfType([PropTypes.oneOf(['butt', 'round', 'square']), PropTypes.func]),
  strokeLinejoin: PropTypes.oneOfType([PropTypes.oneOf(['miter', 'round', 'bevel']), PropTypes.func]),
  strokeDasharray: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  strokeDashoffset: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  strokeMiterlimit: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
};

export const extractStyles = props => {
  return {
    opacity: props.opacity,
    fill: props.fill,
    fillOpacity: props.fillOpacity,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    strokeOpacity: props.strokeOpacity,
    strokeLinecap: props.strokeLinecap,
    strokeLinejoin: props.strokeLinejoin,
    strokeDasharray: props.strokeDasharray,
    strokeDashoffset: props.strokeDashoffset,
    strokeMiterlimit: props.strokeMiterlimit
  };
};
