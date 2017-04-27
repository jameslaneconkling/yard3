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


export default class GroupedStackedBarChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const {
      data,
      xScale,
      yScale,
      groupKey,
      xGroupScale,
      colorScale,
      keys,
      stackKeys,
      x
    } = this.props;

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
      // create group for every state
      .append('g')
      .attr('transform', d => `translate(${xGroupScale(groupKey(d))}, 0)`)
      .classed('state-group', true)
      .selectAll('g')
      .data((d) => {
        return keys.map(key => ({ key, value: d[key] }));
      })
      .enter()
      // create group for every age group
      .append('g')
      .attr('transform', d => `translate(${xScale(x(d))}, 0)`)
      .classed('age-group', true)
      .selectAll('.age-group')
      .data((d) => {
        let currentTop = 0;
        let currentTopScaled = yScale(currentTop);
        return stackKeys.map((stackKey) => {
          const value = d.value[stackKey];
          const valueScaled = yScale(value);
          const newTop = currentTop + value;
          const scaledHeight = containerHeight - valueScaled;
          const newTopScaled = currentTopScaled - scaledHeight;
          const mapped = {
            stackKey,
            value,
            valueScaled,
            yTop: newTop,
            yBottom: currentTop,
            yTopScaled: newTopScaled,
            yBottomScaled: currentTopScaled
          };
          currentTop = newTop;
          currentTopScaled = newTopScaled;
          return mapped;
        });
      })
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', d => containerHeight - d.valueScaled)
      .attr('x', d => xScale(x(d)))
      .attr('y', d => d.yTopScaled)
      .attr('fill', d => colorScale(d.stackKey))
      .classed('age-group', true);

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

GroupedStackedBarChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  groupKey: PropTypes.func,
  keys: PropTypes.arrayOf(PropTypes.string),
  stackKeys: PropTypes.arrayOf(PropTypes.string),
  xGroupScale: PropTypes.func,
  colorScale: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func
};

GroupedStackedBarChart.defaultProps = {
  x: d => d.key,
  y: d => d.value
};


GroupedStackedBarChart.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
