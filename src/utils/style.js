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

export const applyStyles2Selection = (styles, selection) => {
  Object.keys(styles)
    .filter(name => styles[name])
    .map(name => ({
      name: name.replace(/([a-z][A-Z])/g, s => `${s[0]}-${s[1].toLowerCase()}`), // react expects camelCase props, while D3 (and the SVG spec) expect dasherized props
      value: styles[name]
    }))
    .forEach(({name, value}) => selection.attr(name, value));
};
