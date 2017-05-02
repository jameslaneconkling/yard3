import React, {
  PropTypes
} from 'react';
import * as d3 from 'd3';
import {
  applyStyles2Selection,
  extractStyles,
  dynamicStyleTypes
} from '../../../utils/styles';
import {
  eventTypes,
  extractEvents,
  applyEvents2Selection
} from '../../../utils/events';


export default class GroupedBarChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, xScale, yScale, groupKey, xGroupScale, colorScale, keys, x, y } = this.props;
    const { containerWidth, containerHeight } = this.context;
    const $chart = d3.select(this.$chart);

    xGroupScale.rangeRound([0, containerWidth]);
    xScale.rangeRound([0, xGroupScale.bandwidth()]);
    yScale.rangeRound([containerHeight, 0]);

    // create groups
    $chart
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
        .attr('transform', d => `translate(${xGroupScale(groupKey(d))}, 0)`)
      .selectAll('rect')
      .data(d => keys.map(key => ({ key, value: d[key] })))
      .enter()
        .append('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', d => containerHeight - yScale(y(d)))
        .attr('x', d => xScale(x(d)))
        .attr('y', d => yScale(y(d)))
        .attr('fill', d => colorScale(x(d)));

    const bars = $chart.selectAll('.bar');
    applyStyles2Selection(extractStyles(this.props), bars);
    applyEvents2Selection(extractEvents(this.props), bars);

    // exit
    //   .remove();
  }

  render() {
    const { children } = this.props;

    return (
      <g
        ref={(el) => {
          this.$chart = el;
        }}
      >
        { children }
      </g>
    );
  }
}

GroupedBarChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  groupKey: PropTypes.func,
  keys: PropTypes.arrayOf(PropTypes.string),
  xGroupScale: PropTypes.func,
  colorScale: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func
};

GroupedBarChart.defaultProps = {
  x: d => d.key,
  y: d => d.value
};


GroupedBarChart.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
