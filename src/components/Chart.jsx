import React, { PropTypes } from 'react';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.preRender(props);
  }

  componentWillUpdate(nextProps) {
    this.preRender(nextProps);
  }

  /**
   * Setup to run before render and rerender
   * Any properties passed to child components must be available at render time, so all
   * their setup/update logic must run w/i the constructor and componentWillUpdate hook
   */
  preRender(props) {
    const { width, height, bottomMargin, topMargin, leftMargin, rightMargin } = props;
    this.containerWidth = width - leftMargin - rightMargin;
    this.containerHeight = height - topMargin - bottomMargin;
  }

  render() {
    const { containerHeight, containerWidth } = this;
    const { leftMargin, topMargin } = this.props;

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
  height: PropTypes.number.isRequired
};

Chart.defaultProps = {
  topMargin: 20,
  rightMargin: 20,
  bottomMargin: 30,
  leftMargin: 40
};
