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
      .attr('transform', d => {
        // console.log(d);
        return `translate(${xGroupScale(d.groupKey)}, 0)`
      })
      .classed('group', true)
      .selectAll('g')
      .data((d) => {
        // console.log(d);
        return d.data.map(bar => {
          // console.log(bar);
          return {
            key: bar.barKey,
            data: bar.data
          }
        });
      })
      .enter()
      // create group for every age group
      .append('g')
      .attr('transform', d => {
        // console.log(d);
        // console.log(x(d));
        // console.log(xScale(x(d)));
        return `translate(${xScale(x(d))}, 0)`
      })
      .classed('age-group', true)
      .selectAll('.age-group')
      .data((d) => {
        let currentTop = 0;
        let currentTopScaled = yScale(currentTop);
        return d.data.map((block) => {
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
            yBottomScaled: currentTopScaled
          };
          currentTop = newTop;
          currentTopScaled = newTopScaled;
          return mapped;
        });
      })
      .enter()
      .append('rect')
      .classed('block', true)
      .attr('width', xScale.bandwidth())
      .attr('height', d => (containerHeight - d.valueScaled) || 1)
      .attr('x', d => xScale(x(d)))
      .attr('y', d => d.yTopScaled)
      .attr('fill', d => colorScale(d.blockKey))
      .classed('age-group', true);

    const blocks = $chart.selectAll('.block');
    applyStyles2Selection(extractStyles(this.props), blocks);
    applyEvents2Selection(extractEvents(this.props), blocks);

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
  data: PropTypes.array,

  // keys: PropTypes.arrayOf(PropTypes.string),
  // stackKeys: PropTypes.arrayOf(PropTypes.string),
  // groupKey: PropTypes.func,

  xGroupScale: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  colorScale: PropTypes.func,

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
