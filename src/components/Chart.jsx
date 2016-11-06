import React, { PropTypes } from 'react';
import * as d3 from 'd3';

export default class BarChart extends React.Component {
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
    const { width, height, bottomMargin, topMargin, leftMargin, rightMargin, yDomain, xDomain } = props;
    this.containerWidth = width - leftMargin - rightMargin;
    this.containerHeight = height - topMargin - bottomMargin;

    this.xScale = d3.scaleBand()
      .padding(0.1)
      .domain(xDomain(props))
      .rangeRound([0, this.containerWidth]);

    this.yScale = d3.scaleLinear()
      .domain(yDomain(props))
      .rangeRound([this.containerHeight, 0]);
  }

  render() {
    const { xScale, yScale, containerHeight, containerWidth } = this;
    const { data, leftMargin, topMargin, rightMargin, bottomMargin } = this.props;

    return (
      <svg
        ref={el => this.svg = el}
        width={this.props.width}
        height={this.props.height}
        className='chart'
      >
        { React.Children.map(this.props.children, child => React.cloneElement(child, {data, xScale, yScale, containerWidth, containerHeight, leftMargin, topMargin, rightMargin, bottomMargin})) }
      </svg>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  topMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  bottomMargin: PropTypes.number,
  leftMargin: PropTypes.number
};

BarChart.defaultProps = {
  topMargin: 20,
  rightMargin: 20,
  bottomMargin: 30,
  leftMargin: 40,
  xDomain: props => props.data.map(d => d.key),
  yDomain: props => d3.extent(props.data, d => d.value)
};
