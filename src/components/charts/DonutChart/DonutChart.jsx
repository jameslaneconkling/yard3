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
    const { value, data, innerRadius, outerRadius, containerHeight, containerWidth } = this.props;

    // TODO - expose sort, sortValue, startAngle, endAngle, padAngle
    const pie = d3.pie()
      .value(value);

    // TODO - this doens't need to be recreated w/ each update,
    // unless innerRadius/outerRadius change
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius || (Math.min(containerHeight, containerWidth) - 10) / 2);

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

    const slices = $chart.selectAll('.slice');
    applyStyles2Selection(extractStyles(this.props), slices);
    applyEvents2Selection(extractEvents(this.props), slices);

    exit
      .remove();
  }

  render() {
    const { containerWidth, containerHeight, children } = this.props;
    return (
      <g
        ref={(el) => { this.$chart = el; }}
        transform={`translate(${containerWidth / 2}, ${containerHeight / 2})`}
      >
        { React.Children.map(children, child =>
          React.cloneElement(child, { containerWidth, containerHeight })
        ) }
      </g>
    );
  }
}

DonutChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  value: PropTypes.func,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number
};

DonutChart.defaultProps = {
  value: d => d,
  innerRadius: 40
};

export default DonutChart;
