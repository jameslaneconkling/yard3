import React, { PropTypes } from 'react';
import * as d3 from 'd3';

// TODO
// - transitions
// - event handlers
// - multiple composable chart overlays
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
    this.update();
  }

  /**
   * Setup to run before render and rerender
   * Any properties passed to child components must be available at render time, so all
   * their setup/update logic must run w/i the constructor and componentWillUpdate hook
   */
  preRender(props) {
    const { containerWidth, containerHeight, yScale, xScale } = props;

    this.xScale = xScale
      .rangeRound([0, containerWidth]);

    this.yScale = yScale
      .rangeRound([containerHeight, 0]);
  }

  update() {
    const { xScale, yScale } = this;
    const { data, containerHeight, x, y } = this.props;
    const $chart = d3.select(this.$chart);

    // const t = d3.transition()
    //   .duration(500)
    //   .ease(d3.easeLinear);

    const update = $chart.selectAll('.bar')
      .data(data);
    const enter = update.enter();
    const exit = update.exit();

    enter
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(x(d)))
      .attr('y', d => yScale(y(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', d => containerHeight - yScale(y(d)));

    update
      .attr('width', xScale.bandwidth())
      .attr('height', d => containerHeight - yScale(y(d)))
      .attr('x', d => xScale(x(d)))
      .attr('y', d => yScale(y(d)));

    // or
    // enter
    //   .append('rect')
    //   .attr('class', 'bar')
    // .merge(update)
    //   .attr('width', xScale.bandwidth())
    //   .attr('height', d => containerHeight - yScale(y(d)))
    //   .attr('x', d => xScale(x(d)))
    //   .attr('y', d => yScale(y(d)));

    exit
      .remove();
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

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  topMargin: PropTypes.number,
  bottompMargin: PropTypes.number,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number
};

BarChart.defaultProps = {
  x: d => d.key,
  y: d => d.value
};
