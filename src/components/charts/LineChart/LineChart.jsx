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


class LineChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { containerWidth, containerHeight } = this.context;
    const { x, y, data } = this.props;
    const xScale = this.props.xScale || this.context.xScale;
    const yScale = this.props.yScale || this.context.yScale;

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);

    const $chart = d3.select(this.$chart);

    const line = d3.line()
      .x(d => xScale(x(d)))
      .y(d => yScale(y(d)));

    $chart.selectAll('path').remove();

    $chart.append('path')
      .attr('class', 'line')
      .attr('d', line(data));

    const $line = $chart.selectAll('.line');
    applyStyles2Selection(extractStyles(this.props), $line);
    applyEvents2Selection(extractEvents(this.props), $line);
  }

  render() {
    const { children } = this.props;

    return (
      <g
        ref={(el) => { this.$chart = el; }}
      >
        { children }
      </g>
    );
  }
}

LineChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  fill: PropTypes.string                  // a sane style default to prevent line from having a fill; propbably don't overwrite
};

LineChart.defaultProps = {
  x: d => d.key,
  y: d => d.value,
  fill: 'none'
};

LineChart.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default LineChart;
