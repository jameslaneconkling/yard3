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
      xGroupScale,
      colorScale,
      mouseEventSelector,
      x
    } = this.props;

    const { containerWidth, containerHeight } = this.context;
    const $chart = d3.select(this.$chart);

    xGroupScale.rangeRound([0, containerWidth]);
    xScale.rangeRound([0, xGroupScale.bandwidth()]);
    yScale.rangeRound([containerHeight, 0]);

    const groupUpdate = $chart
      .selectAll('.group')
      .data(data, (d) => d ? d.groupKey : this.id);

    const groupEnter = groupUpdate
      .enter();

    const group = groupEnter
      .append('g')
      .classed('group', true)
      .attr('id', (d) => d.groupKey)
      .merge(groupUpdate)
      .attr('transform', d => `translate(${xGroupScale(d.groupKey)}, 0)`);

    const barUpdate = $chart
      .selectAll('.group').selectAll('.bar')
      .data((group) => group.data.map(bar => {
        var bar = bar;
        console.log(bar);
        return bar;
      }), (d) => d ? `${d.groupKey}-${d.barKey}` : this.id);

    barUpdate
      .enter()
      .append('g')
      .classed('bar', true)
      .attr('id', (d) => `${d.groupKey}-${d.barKey}`)
      .merge(barUpdate)
      .attr('transform', bar => {
        const a = `translate(${xScale(bar.barKey)}, 0)`;
        console.log(a);
        return a;
      });

    const blockUpdate = $chart
      .selectAll('.group').selectAll('.bar').selectAll('.block')
      .data((bar) => {
        let currentTop = 0;
        let currentTopScaled = yScale(currentTop);
        return bar.data.map((block) => {
          const value = block.value;
          const valueScaled = yScale(value);
          const newTop = currentTop + value;
          const scaledHeight = containerHeight - valueScaled;
          const newTopScaled = currentTopScaled - scaledHeight;
          const mapped = {
            blockKey: block.blockKey,
            value,
            valueScaled,
            yTop: newTop,
            yBottom: currentTop,
            yTopScaled: newTopScaled,
            yBottomScaled: currentTopScaled,
            data: block.data,
          };
          currentTop = newTop;
          currentTopScaled = newTopScaled;
          return mapped;
        }, (d) => d ? `${d.groupKey}-${d.barKey}-${d.blockKey}` : this.id);
      });

    blockUpdate
      .enter()
      .append('rect')
      .attr('class', d => d.class)
      .classed('block', true)
      .attr('id', (d) => `${d.groupKey}-${d.barKey}-${d.blockKey}`)
      .merge(blockUpdate)
      .attr('width', xScale.bandwidth())
      .attr('height', d => (containerHeight - d.valueScaled) || 1)
      .attr('x', d => xScale(x(d)))
      .attr('y', d => d.yTopScaled)
      .attr('fill', d => d.fill || colorScale(d.blockKey));

    const selected = $chart.selectAll(mouseEventSelector || '.block');
    applyStyles2Selection(extractStyles(this.props), selected);
    applyEvents2Selection(extractEvents(this.props), selected);

    blockUpdate.exit().remove();
    barUpdate.exit().remove();
    groupUpdate.exit().remove();
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
  data: PropTypes.array,

  xGroupScale: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,

  mouseEventSelector: PropTypes.string,

  x: PropTypes.func,
  y: PropTypes.func
};

GroupedStackedBarChart.defaultProps = {
  x: d => d.key,
  y: d => d.value,
  data: [],
};

GroupedStackedBarChart.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
