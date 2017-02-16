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


class DonutChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    let { outerRadius, innerRadius } = this.props;
    const { value, data } = this.props;
    const { containerHeight, containerWidth } = this.context;

    // TODO - expose sort, sortValue, startAngle, endAngle, padAngle
    const pie = d3.pie()
      .value(value);

    // TODO - figure out where to store styles for tooltip and create default styles
    var tt = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style('position', 'absolute')
      .style("opacity", 0);

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
      .on("mouseover", function(d) {
        tt.transition()
          .duration(200)
          .style("opacity", .9);
        tt.html(d.value.toFixed(2))
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tt.transition()
          .duration(200)
          .style("opacity", 0);
      })
    .merge(update)
      .attr('d', d => arc(d));

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
};

DonutChart.defaultProps = {
  value: d => d
};

DonutChart.contextTypes = {
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default DonutChart;
