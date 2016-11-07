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
    const { containerWidth, containerHeight, xScale, yScale } = props;

    this.xScale = xScale
      .rangeRound([0, containerWidth]);

    this.yScale = yScale
      .rangeRound([containerHeight, 0]);
  }

  update() {
    const { data, x, y } = this.props;
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
        .x(d => xScale(x(d)))
        .y(d => yScale(y(d)))
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
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  topMargin: PropTypes.number,
  bottompMargin: PropTypes.number,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number,
};

LineChart.defaultProps = {
  x: d => d.key,
  y: d => d.value
};
