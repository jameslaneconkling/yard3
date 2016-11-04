import React, { PropTypes } from 'react';
import * as d3 from 'd3';

// TODO
// - transitions
// - event handlers
// - multiple composable chart overlays
export default class BarChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, containerHeight, xScale, yScale } = this.props;
    const $chart = d3.select(this.$chart);

    const t = d3.transition()
      .duration(500)
      .ease(d3.easeLinear);

    const update = $chart.selectAll('.bar')
      .data(data)
    const enter = update.enter();
    const exit = update.exit();

    enter
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.key))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => containerHeight - yScale(d.value));

    update
      .attr('width', xScale.bandwidth())
      .attr('height', d => containerHeight - yScale(d.value))
      .attr('x', d => xScale(d.key))
      .attr('y', d => yScale(d.value));

    // or
    // enter
    //   .append('rect')
    //   .attr('class', 'bar')
    // .merge(update)
    //   .attr('width', xScale.bandwidth())
    //   .attr('height', d => containerHeight - yScale(d.value))
    //   .attr('x', d => xScale(d.key))
    //   .attr('y', d => yScale(d.value));

    exit
      .remove();
  }

  render() {
    const { xScale, yScale, containerHeight, containerWidth, leftMargin, topMargin } = this.props;

    return (
      <g
        ref={el => this.$chart = el}
        transform={`translate(${this.props.leftMargin},${this.props.topMargin})`}
      >
        { React.Children.map(this.props.children, child => React.cloneElement(child, {xScale, yScale, containerWidth, containerHeight})) }
      </g>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  topMargin: PropTypes.number,
  bottompMargin: PropTypes.number,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number
};
