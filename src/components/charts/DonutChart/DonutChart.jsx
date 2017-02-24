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


class DonutChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    let { outerRadius, innerRadius, centerText, centerLabel } = this.props;
    const { value, data } = this.props;
    const { containerHeight, containerWidth } = this.context;

    // TODO - expose sort, sortValue, startAngle, endAngle, padAngle
    const pie = d3.pie()
      .value(value);

    // TODO - this doens't need to be recreated w/ each update,
    // unless innerRadius/outerRadius change
    outerRadius = outerRadius || (Math.min(containerHeight, containerWidth) - 10) / 2;
    innerRadius = innerRadius || outerRadius - 40;
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const $chart = d3.select(this.$chart);
    const update = $chart.selectAll('.slice')
      .data(pie(data));
    const enter = update.enter();
    const exit = update.exit();

    enter
      .append('path')
      .attr('class', 'slice')
    .merge(update)
      .attr('d', d => arc(d));

    enter
      .append('text')
      .classed('yard3-donut-chart-value', true)
      .style('text-anchor', 'middle')
      .attr('dy', +10)
      .style('font-size', 24)
      .text(function(d) {
        return centerText;
      });

    enter
      .append('text')
      .classed('yard3-donut-chart-label', true)
      .style('text-anchor', 'middle')
      .attr('fill', '#aaa')
      .attr('dy', function(d) {
        return -20;
      })
      .text(function(d) {
        return centerLabel;
      });

    const slices = $chart.selectAll('.slice');
    applyStyles2Selection(extractStyles(this.props), slices);
    applyEvents2Selection(extractEvents(this.props), slices);

    exit
      .remove();
  }

  render() {
    const { children } = this.props;
    const { containerWidth, containerHeight } = this.context;
    return (
      <g
        ref={(el) => { this.$chart = el; }}
        transform={`translate(${containerWidth / 2}, ${containerHeight / 2})`}
      >
        {children}
      </g>
    );
  }
}

// TODO - add showTooltip bool as well as tooltip map func data => tooltipHtml
DonutChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  value: PropTypes.func,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  centerText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  centerLabel: PropTypes.string
};

DonutChart.defaultProps = {
  value: d => d,
  centerText: null,
  centerLabel: null
};

DonutChart.contextTypes = {
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default DonutChart;
