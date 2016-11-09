import React, {
  PropTypes
}                     from 'react';
import * as d3        from 'd3';


export default class ScatterPlot extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, x, y, containerWidth, containerHeight, yScale, xScale } = this.props;
    const $chart = d3.select(this.$chart);

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);

    const update = $chart.selectAll('.bar')
      .data(data);
    const enter = update.enter();
    const exit = update.exit();


    enter
      .append('circle')
      .attr('class', 'dot')
    .merge(update)
      .attr('r', 3.5)
      .attr('cx', d => xScale(x(d)))
      .attr('cy', d => yScale(y(d)));

    exit
      .remove();
  }

  render() {
    const { containerHeight, containerWidth, children } = this.props;

    return (
      <g
        ref={el => this.$chart = el}
      >
        { React.Children.map(children, child => React.cloneElement(child, {containerWidth, containerHeight})) }
      </g>
    );
  }
}

ScatterPlot.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number
};

ScatterPlot.defaultProps = {
  x: d => d.key,
  y: d => d.value
};
