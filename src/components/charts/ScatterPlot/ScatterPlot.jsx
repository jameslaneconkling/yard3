import React, {
  PropTypes
} from 'react';
import * as d3 from 'd3';
import {
  dynamicStyleTypes,
  extractStyles,
  applyStyles2Selection
} from '../../../utils/styles';
import {
  eventTypes,
  extractEvents,
  applyEvents2Selection
} from '../../../utils/events';


export default class ScatterPlot extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, x, y, r, containerWidth, containerHeight } = this.props;
    const $chart = d3.select(this.$chart);
    const xScale = this.props.xScale || this.context.xScale;
    const yScale = this.props.yScale || this.context.yScale;

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
    const circles = $chart.selectAll('.dot');
    applyStyles2Selection(extractStyles(this.props), circles);
    applyEvents2Selection(extractEvents(this.props), circles);

    exit
      .remove();
  }

  render() {
    const { containerHeight, containerWidth, children } = this.props;

    return (
      <g
        ref={(el) => { this.$chart = el; }}
      >
        { React.Children.map(children, child =>
          React.cloneElement(child, { containerWidth, containerHeight })
        ) }
      </g>
    );
  }
}

ScatterPlot.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  r: PropTypes.func
};

ScatterPlot.defaultProps = {
  x: d => d.key,
  y: d => d.value,
  r: () => 5
};

ScatterPlot.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func
};
