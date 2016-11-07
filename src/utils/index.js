export const extractStyles = props => {
  return {
    opacity: props.opacity,
    fill: props.fill,
    'fillOpacity': props['fillOpacity'],
    stroke: props.stroke,
    'stroke-width': props['stroke-width'],
    'stroke-opacity': props['stroke-opacity'],
    'stroke-linecap': props['stroke-linecap'],
    'stroke-linejoin': props['stroke-linejoin'],
    'stroke-dasharray': props['stroke-dasharray'],
    'stroke-dashoffset': props['stroke-dashoffset'],
    'stroke-miterlimit': props['stroke-miterlimit']
  };
};
