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
