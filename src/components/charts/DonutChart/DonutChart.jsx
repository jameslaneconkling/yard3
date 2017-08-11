/* eslint-env browser */
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

function fitsInCircle(radius, width, height) {
  const angle = Math.atan2(height, width / 2);
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return x >= width / 2 && y >= height;
}

function wrapInCircle(text, radius) {
  text.each(function wrapText() {
    const textNode = d3.select(this);
    const words = textNode.text().split(/\s+/);
    const lineHeight = 25; // px
    const y = textNode.attr('y');
    const dy = parseFloat(textNode.attr('dy'));
    let tspan = textNode.text(null).append('tspan')
      .attr('x', 0)
      .attr('y', y)
      .attr('dy', `${dy}px`);
    let line = [];
    let lineNumber = 1;
    let word = words.pop();
    let height;
    while (word) {
      line.unshift(word);
      tspan.text(line.join(' '));
      const width = tspan.node().getComputedTextLength();
      height = (lineHeight * lineNumber) - dy;
      if (!fitsInCircle(radius, width, height)) {
        line.shift();
        tspan.text(line.join(' '));
        line = [word];
        tspan = textNode.append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', `${dy}px`)
          .text(word);
        lineNumber += 1;
      }
      word = words.pop();
    }
  });
}

class DonutChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    let { outerRadius, innerRadius } = this.props;
    const {
      centerText,
      centerLabel,
      labelBuffer
    } = this.props;
    const { value, data } = this.props;
    const { containerHeight, containerWidth } = this.context;

    // TODO - expose sort, sortValue, startAngle, endAngle, padAngle
    const pie = d3.pie()
      .value(value);

    // TODO - this doens't need to be recreated w/ each update,
    // unless innerRadius/outerRadius change
    outerRadius = outerRadius || (Math.min(containerHeight, containerWidth) - 10) / 2;
    innerRadius = innerRadius || outerRadius - 40;
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

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


    d3.select(this.$chart)
      .selectAll('.yard3-donut-chart-value')
      .remove();

    d3.select(this.$chart)
      .selectAll('.yard3-donut-chart-label')
      .remove();

    d3.select(this.$chart)
      .append('text')
      .classed('yard3-donut-chart-value', true)
      .style('text-anchor', 'middle')
      .attr('dy', +20)
      .text(() => centerText);

    const labelSize = innerRadius - labelBuffer;
    d3.select(this.$chart)
      .append('text')
      .classed('yard3-donut-chart-label', true)
      .style('text-anchor', 'middle')
      .attr('fill', '#aaa')
      .attr('dy', () => -20)
      .text(() => centerLabel)
      .call(wrapInCircle, labelSize);

    const slices = $chart.selectAll('.slice');
    applyStyles2Selection(extractStyles(this.props), slices);
    applyEvents2Selection(extractEvents(this.props), slices);

    exit
      .remove();
  }

  render() {
    const { children } = this.props;
    const { containerWidth, containerHeight } = this.context;
    return (
      <g
        ref={(el) => { this.$chart = el; }}
        transform={`translate(${containerWidth / 2}, ${containerHeight / 2})`}
      >
        {children}
      </g>
    );
  }
}

// TODO - add showTooltip bool as well as tooltip map func data => tooltipHtml
DonutChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  value: PropTypes.func,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  centerText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  centerLabel: PropTypes.string,
  labelBuffer: PropTypes.number
};

DonutChart.defaultProps = {
  value: d => d,
  centerText: null,
  centerLabel: null,
  labelBuffer: 9
};

DonutChart.contextTypes = {
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default DonutChart;
