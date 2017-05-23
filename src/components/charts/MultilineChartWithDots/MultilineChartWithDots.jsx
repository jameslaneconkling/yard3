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


class MultilineChartWithDots extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { containerWidth, containerHeight } = this.context;
    const { data, r, colorScale } = this.props;

    const flattenUnique = (arrs) => {
      const newArr = [];
      arrs.forEach((arr) => {
        arr.forEach((ar) => {
          if (!newArr.find((a) => a === ar)) {
            newArr.push(ar);
          }
        });
      });
      return newArr;
    };

    const keys = flattenUnique(data.map((pot) => pot.data.map((coord) => coord.lineKey)));

    const lineData = keys.map(key => {
      let fill;
      let stroke;

      const points = data.map(d => {
        const point = d.data.find(point => point.lineKey === key);
        fill = point.fill;
        stroke = point.stroke;
        return {
          x: d.xValue,
          y: point.value,
        };
      });
      return {
        stroke: stroke,
        fill: fill,
        lineKey: key,
        p: points,
      };
    });

    const xScale = this.props.xScale || this.context.xScale;
    const yScale = this.props.yScale || this.context.yScale;

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);

    const $chart = d3.select(this.$chart);

    const update = $chart
      .selectAll('.line')
      .data(lineData);

    const enter = update.enter();
    const exit = update.exit();

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    $chart.selectAll('path').remove();
    $chart.selectAll('circle').remove();

    enter.insert('path')
      .attr('stroke', d => d.stroke || colorScale(d.lineKey))
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("fill", 'none')
      .attr('d', d => line(d.p));

    const dotGroupUpdate = $chart
      .selectAll('.dot-group')
      .data(data);
    const dotExit = dotGroupUpdate.exit();

    dotGroupUpdate
      .enter()
      .append('g')
      .classed('dot-group', true);

    const dotUpdate = $chart
      .selectAll('.dot-group')
      .selectAll('.dot')
      .data(d => d.data.map(point => ({
        x: d.xValue,
        y: point.value,
        lineKey: point.lineKey,
        stroke: point.stroke,
        fill: point.fill,
      })));

    dotUpdate
      .enter()
      .append('circle')
      .attr('stroke-width', 3)
      .merge(dotUpdate)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('fill', d => d.fill || colorScale(d.lineKey))
      .attr('stroke', d => d.stroke || colorScale(d.lineKey))
      .attr('r', r || this.props.r);

    const $line = $chart.selectAll('.line');
    applyStyles2Selection(extractStyles(this.props), $line);

    const circles = $chart.selectAll('.dot-group');
    applyStyles2Selection(extractStyles(this.props), circles);
    applyEvents2Selection(extractEvents(this.props), circles);

    dotExit.remove();
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

MultilineChartWithDots.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  colorScale: PropTypes.func,
  /**
   * a sane style default to prevent line from having a fill--propbably don't overwrite
   */
  r: PropTypes.func
};

MultilineChartWithDots.defaultProps = {
  x: d => d[0],
  y: d => d[1],
  r: () => 5,
  colorScale: () => 'black',
};

MultilineChartWithDots.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default MultilineChartWithDots;
