import React, { PropTypes } from 'react';
import * as d3 from 'd3';

export default class LineChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, containerHeight, xScale, yScale } = this.props;
    const $chart = d3.select(this.$chart);

    const update = $chart.selectAll('.bar')
      .data(data)
    const enter = update.enter();
    const exit = update.exit();

    $chart
      .selectAll('path.line')
      .remove();

    $chart
      .append('path')
      .datum(data)
      .attr("class", "line")
      .attr("d", d3.line()
        .x(d => xScale(d.key))
        .y(d => yScale(d.value))
      );
  }

  render() {
    const { xScale, yScale, containerHeight, containerWidth, leftMargin, topMargin, children } = this.props;

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