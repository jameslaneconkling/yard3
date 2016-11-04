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

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    const { data } = this.props;
    this.update();
  }

  /**
   * Setup to run before render and rerender
   * Any properties passed to child components must be available at render time, so all
   * their setup/update logic must run w/i the constructor or componentWillUpdate hook
   */
  preRender(props) {
    const { width, height, bottomMargin, topMargin, leftMargin, rightMargin, data } = props;
    this.containerWidth = width - leftMargin - rightMargin;
    this.containerHeight = height - topMargin - bottomMargin;

    this.xScale = d3.scaleBand()
      .padding(0.1)
      .domain(data.map(d => d.key))
      .rangeRound([0, this.containerWidth]);
    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .rangeRound([this.containerHeight, 0]);
  }

  /**
   * D3 DOM data binding to run after react has rendered
   */
  update() {
    const { data } = this.props;
    const $chart = d3.select(this.$chart);

    // enter
    $chart.selectAll('.bar').data(data)
      .enter().append('rect')
      .attr('class', 'bar');

    // update
    $chart.selectAll('.bar').data(data)
      .attr('x', d => this.xScale(d.key))
      .attr('y', d => this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', d => this.containerHeight - this.yScale(d.value));

    // exit
    $chart.selectAll('.bar').data(data)
      .exit()
      .remove();
  }

  render() {
    const { xScale, yScale, containerHeight, containerWidth } = this;

    return (
      <svg
        ref={el => this.svg = el}
        width={this.props.width}
        height={this.props.height}
        className='barChart'
      >
        <g
          ref={el => this.$chart = el}
          transform={`translate(${this.props.leftMargin},${this.props.topMargin})`}
        >
          {this.props.children && React.cloneElement(this.props.children, {xScale, yScale, containerWidth, containerHeight})}
        </g>
      </svg>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  topMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  bottomMargin: PropTypes.number,
  leftMargin: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

BarChart.defaultProps = {
  topMargin: 20,
  rightMargin: 20,
  bottomMargin: 30,
  leftMargin: 40,
  width: 800,
  height: 400
};
