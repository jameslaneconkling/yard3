import React, { PropTypes } from 'react';
import * as d3 from 'd3';

export default class LineChart extends React.Component {
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
    this.update();
  }

  /**
   * Setup to run before render and rerender
   * Any properties passed to child components must be available at render time, so all
   * their setup/update logic must run w/i the constructor and componentWillUpdate hook
   */
  preRender(props) {
    const { containerWidth, containerHeight, yDomain, xDomain } = props;

    this.xScale = d3.scaleBand()
      .padding(0.1)
      .domain(xDomain(props))
      .rangeRound([0, containerWidth]);

    this.yScale = d3.scaleLinear()
      .domain(yDomain(props))
      .rangeRound([containerHeight, 0]);
  }

  update() {
    const { data } = this.props;
    const { xScale, yScale } = this;
    const $chart = d3.select(this.$chart);

    // const update = $chart.selectAll('.bar')
    //   .data(data);
    // const enter = update.enter();
    // const exit = update.exit();

    // TODO - better way then simply blowing the existing line svg away?
    $chart
      .selectAll('path.line')
      .remove();

    $chart
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', d3.line()
        .x(d => xScale(d.key))
        .y(d => yScale(d.value))
      );
  }

  render() {
    const { xScale, yScale } = this;
    const { containerHeight, containerWidth, leftMargin, topMargin, children } = this.props;

    return (
      <g
        ref={el => this.$chart = el}
        transform={`translate(${leftMargin},${topMargin})`}
      >
        { React.Children.map(children, child => React.cloneElement(child, {xScale, yScale, containerWidth, containerHeight})) }
      </g>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  topMargin: PropTypes.number,
  bottompMargin: PropTypes.number,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  xDomain: PropTypes.func,
  yDomain: PropTypes.func
};

LineChart.defaultProps = {
  xDomain: props => props.data.map(d => d.key),
  yDomain: props => d3.extent(props.data, d => d.value)
};
