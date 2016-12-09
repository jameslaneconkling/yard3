import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import {
  extractStyles,
  dynamicStyleTypes,
  applyStyles2Selection
} from '../../../utils/styles';
import {
  eventTypes,
  extractEvents,
  applyEvents2Selection
} from '../../../utils/events';


class AreaChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { containerWidth, containerHeight, x0, x1, y0, y1, data } = this.props;
    const xScale = this.props.xScale || this.context.xScale;
    const yScale = this.props.yScale || this.context.yScale;

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);

    const $chart = d3.select(this.$chart);

    const area = d3.area()
      .x0(d => xScale(x0(d)))
      .x1(x1 ? d => xScale(x1(d)) : undefined)
      .y0(d => yScale(y0(d)))
      .y1(y1 ? d => yScale(y1(d)) : containerHeight);

    $chart.selectAll('path').remove();

    $chart.append('path')
      .attr('class', 'area')
      .attr('d', area(data));

    const $area = $chart.selectAll('.area');
    applyStyles2Selection(extractStyles(this.props), $area);
    applyEvents2Selection(extractEvents(this.props), $area);
  }

  render() {
    const { containerWidth, containerHeight, children } = this.props;

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

AreaChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  x0: PropTypes.func.isRequired,
  x1: PropTypes.func,
  y0: PropTypes.func.isRequired,
  y1: PropTypes.func
};

AreaChart.defaultProps = {
  x0: d => d.key,
  y0: d => d.value
};

AreaChart.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func
};

export default AreaChart;
