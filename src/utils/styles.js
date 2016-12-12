/* eslint-disable key-spacing */
import { PropTypes } from 'react';

export const dynamicStyleTypes = {
  opacity:             PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  fill:                PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  fillOpacity:         PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  stroke:              PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  strokeWidth:         PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  strokeOpacity:       PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  strokeLinecap:       PropTypes.oneOfType([PropTypes.oneOf(['butt', 'round', 'square']), PropTypes.func]),
  strokeLinejoin:      PropTypes.oneOfType([PropTypes.oneOf(['miter', 'round', 'bevel']), PropTypes.func]),
  strokeDasharray:     PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  strokeDashoffset:    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  strokeMiterlimit:    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func])
};

export const staticStyleTypes = {
  opacity:             PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fill:                PropTypes.string,
  fillOpacity:         PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stroke:              PropTypes.string,
  strokeWidth:         PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeOpacity:       PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeLinecap:       PropTypes.oneOf(['butt', 'round', 'square']),
  strokeLinejoin:      PropTypes.oneOf(['miter', 'round', 'bevel']),
  strokeDasharray:     PropTypes.string,
  strokeDashoffset:    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeMiterlimit:    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export const extractStyles = props => (
  [
    ['opacity', props.opacity],
    ['fill', props.fill],
    ['fillOpacity', props.fillOpacity],
    ['stroke', props.stroke],
    ['strokeWidth', props.strokeWidth],
    ['strokeOpacity', props.strokeOpacity],
    ['strokeLinecap', props.strokeLinecap],
    ['strokeLinejoin', props.strokeLinejoin],
    ['strokeDasharray', props.strokeDasharray],
    ['strokeDashoffset', props.strokeDashoffset],
    ['strokeMiterlimit', props.strokeMiterlimit]
  ]
    .filter(tuple => tuple[1])
    .reduce((styleObj, [key, value]) => {
      styleObj[key] = value;
      return styleObj;
    }, {})
);

// TODO - find a better pattern to apply dynamic styles
//        ideally, d3-selection-multi or selection.call()
//        could handle this directly on the enter.merge(update) selection
//        rather than needing to reselect
export const applyStyles2Selection = (styles, selection) => {
  Object.keys(styles)
    .map(name => ({
      name: name.replace(/([a-z][A-Z])/g, s => `${s[0]}-${s[1].toLowerCase()}`), // react expects camelCase props, while D3 (and the SVG spec) expect dasherized props
      value: styles[name]
    }))
    .forEach(({ name, value }) => selection.attr(name, value));

  return selection;
};
