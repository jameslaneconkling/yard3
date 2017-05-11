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


class LineChartWithDots extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { containerWidth, containerHeight } = this.context;
    const { x, y, r } = this.props;

    const data = [
      {
        xValue: 1,
        data: [
          {
            lineKey: 'a',
            lineLabel: 'A',
            value: 1
          },
          {
            lineKey: 'b',
            lineLabel: 'B',
            value: 2
          },
          {
            lineKey: 'c',
            lineLabel: 'C',
            value: 3
          }
        ]
      },
      {
        xValue: 2,
        data: [
          {
            lineKey: 'a',
            lineLabel: 'A',
            value: 2
          },
          {
            lineKey: 'b',
            lineLabel: 'B',
            value: 3
          },
          {
            lineKey: 'c',
            lineLabel: 'C',
            value: 4
          }
        ]
      },
      {
        xValue: 3,
        data: [
          {
            lineKey: 'a',
            lineLabel: 'A',
            value: 10
          },
          {
            lineKey: 'b',
            lineLabel: 'B',
            value: 7
          },
          {
            lineKey: 'c',
            lineLabel: 'C',
            value: 0
          }
        ]
      }
    ];

    // todo: do better :(
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

    const lineData = keys.map(key => data.map(d => {
      const point = d.data.find(point => point.lineKey === key);
      return [d.xValue, point.value];
    }));

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
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));

    $chart.selectAll('path').remove();
    $chart.selectAll('circle').remove();

    enter.append('path')
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr('d', line);

    const dotGroupUpdate = $chart.selectAll('.dot')
      .data(data);
    const dotExit = dotGroupUpdate.exit();

    dotGroupUpdate
      .enter()
      .append('g')
      .classed('dot-group', true);

    const dotUpdate = $chart
      .selectAll('.dot-group')
      .selectAll('.dot')
      .data(d => d.data.map(point => [d.xValue, point.value]));

    dotUpdate
      .enter()
      .append('circle')
      .attr('fill', () => 'blue')
      .merge(dotUpdate)
      .attr('cx', d => {
        console.log(d);
        return xScale(d[0])
      })
      .attr('cy', d => yScale(d[1]))
      .attr('r', r);


    const $line = $chart.selectAll('.line');
    applyStyles2Selection(extractStyles(this.props), $line);

    const circles = $chart.selectAll('.dot');
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

LineChartWithDots.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  /**
   * a sane style default to prevent line from having a fill--propbably don't overwrite
   */
  fill: PropTypes.string,
  r: PropTypes.func
};

LineChartWithDots.defaultProps = {
  x: d => d[0],
  y: d => d[1],
  fill: 'none',
  r: () => 5
};

LineChartWithDots.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default LineChartWithDots;
