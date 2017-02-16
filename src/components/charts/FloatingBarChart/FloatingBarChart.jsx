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


export default class FloatingBarChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, x, yTop, yBottom } = this.props;
    const { containerWidth, containerHeight } = this.context;
    const $chart = d3.select(this.$chart);
    const xScale = this.props.xScale || this.context.xScale;
    const yScale = this.props.yScale || this.context.yScale;

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);

    const update = $chart.selectAll('.bar')
      .data(data);
    const enter = update.enter();
    const exit = update.exit();

    enter
      .append('rect')
      .attr('class', 'bar')
    .merge(update)
      .attr('width', xScale.bandwidth())
      .attr('height', d => containerHeight - yScale(yTop(d)) - (containerHeight - yScale(yBottom(d))))
      .attr('x', d => xScale(x(d)))
      .attr('y', d => yScale(yTop(d)));

    const bars = $chart.selectAll('.bar');
    applyStyles2Selection(extractStyles(this.props), bars);
    applyEvents2Selection(extractEvents(this.props), bars);

    exit
      .remove();
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

const dataShape = PropTypes.shape({
  key: PropTypes.string,
  upperValue: PropTypes.number,
  lowerValue: PropTypes.number
});

FloatingBarChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.arrayOf(dataShape).isRequired,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  x: PropTypes.func,
  yTop: PropTypes.func,
  yBottom: PropTypes.func
};

FloatingBarChart.defaultProps = {
  x: d => d.key,
  yTop: d => d.topValue,
  yBottom: d => d.bottomValue
};

FloatingBarChart.contextTypes = {
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
