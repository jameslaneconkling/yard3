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

export default class GroupedLayeredBarChart extends React.Component {
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
      minPixelsShown,
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
      .data((group) => group.data.map(bar => bar), (d) => d ? `${d.groupKey}-${d.barKey}` : this.id);

    barUpdate
      .enter()
      .append('g')
      .classed('bar', true)
      .attr('id', (d) => `${d.groupKey}-${d.barKey}`)
      .merge(barUpdate)
      .attr('transform', bar => `translate(${xScale(bar.barKey)}, 0)`);

    const blockUpdate = $chart
      .selectAll('.group').selectAll('.bar').selectAll('.block')
      .data((bar) => bar.data.map((block) => ({
        blockKey: block.blockKey,
        barKey: block.barKey,
        groupKey: block.groupKey,
        value: block.value,
        data: block.data,
        fill: block.fill,
        class: block.class
      })), (d) => d ? `${d.groupKey}-${d.barKey}-${d.blockKey}` : this.id);

    blockUpdate
      .enter()
      .append('rect')
      .attr('class', d => d.class)
      .classed('block', true)
      .attr('id', (d) => `${d.groupKey}-${d.barKey}-${d.blockKey}`)
      .merge(blockUpdate)
      .attr('width', xScale.bandwidth())
      .attr('height', d => {
        if ((containerHeight - yScale(d.value)) === 0) {
          return minPixelsShown;
        }
        return containerHeight - yScale(d.value);
      })
      .attr('x', d => xScale(d.value))
      .attr('y', d => {
        if (yScale(d.value) === containerHeight) {
          return yScale(d.value) - minPixelsShown;
        }
        return yScale(d.value);
      })
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

GroupedLayeredBarChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array,

  xGroupScale: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,

  mouseEventSelector: PropTypes.string,

  minPixelsShown: PropTypes.number,
};

GroupedLayeredBarChart.defaultProps = {
  data: [],
  minPixelsShown: 0,
};

GroupedLayeredBarChart.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
