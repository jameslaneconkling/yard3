import React, {
  PropTypes
}                from 'react';

export default class Chart extends React.Component {
  render() {
    const { width, height, bottomMargin, topMargin, leftMargin, rightMargin } = this.props;
    const containerWidth = width - leftMargin - rightMargin;
    const containerHeight = height - topMargin - bottomMargin;

    return (
      <svg
        ref={el => this.svg = el}
        width={this.props.width}
        height={this.props.height}
        className='chart'
      >
        <g
          transform={`translate(${leftMargin},${topMargin})`}
        >
          { React.Children.map(this.props.children, child => React.cloneElement(child, {containerWidth, containerHeight})) }
        </g>
      </svg>
    );
  }
}

Chart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  topMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  bottomMargin: PropTypes.number,
  leftMargin: PropTypes.number
};

Chart.defaultProps = {
  topMargin: 20,
  rightMargin: 20,
  bottomMargin: 30,
  leftMargin: 40
};
