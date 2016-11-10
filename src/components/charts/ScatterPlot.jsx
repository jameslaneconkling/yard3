import React, {
  PropTypes
}                          from 'react';
import * as d3             from 'd3';
import {
  stylePropTypes,
  extractStyles,
  applyStyles2Selection
}                          from '../../utils/style';


export default class ScatterPlot extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, x, y, r, containerWidth, containerHeight, yScale, xScale } = this.props;
    const $chart = d3.select(this.$chart);

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);

    const update = $chart.selectAll('.dot')
      .data(data);
    const enter = update.enter();
    const exit = update.exit();

    enter
      .append('circle')
      .attr('class', 'dot')
    .merge(update)
      .attr('cx', d => xScale(x(d)))
      .attr('cy', d => yScale(y(d)))
      .attr('r', r);

    // TODO - should be able to pass enter.merge(update), rather than reselecting?
    applyStyles2Selection(extractStyles(this.props), $chart.selectAll('.dot'));

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
  ...stylePropTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  r: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number
};

ScatterPlot.defaultProps = {
  x: d => d.key,
  y: d => d.value,
  r: () => 5
};
