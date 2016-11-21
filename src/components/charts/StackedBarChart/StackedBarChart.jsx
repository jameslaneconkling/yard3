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


export default class StackedBarChart extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, x, keys, containerWidth, containerHeight, yScale, xScale } = this.props;
    const $chart = d3.select(this.$chart);

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);

    // const update = $chart.selectAll('.serie')
    //   .data(d3.stack().keys(keys)(data));
    // const enter = update.enter();
    // const exit = update.exit();

    $chart.selectAll('.serie')
      .data(d3.stack().keys(keys)(data))
      .enter()
      .append('g')
      .attr('class', 'serie')
    .selectAll('.bar')
      .data((serie) => {
        // attach serie key to each bar
        serie.forEach((d) => { d.key = serie.key; });
        return serie;
      })
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(x(d.data)))
      .attr('y', d => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(d[0]) - yScale(d[1]));

    // update
    //   .attr('x', d => xScale(x(d.data)))
    //   .attr('y', d => yScale(d[1]))
    //   .attr('width', xScale.bandwidth())
    //   .attr('height', d => yScale(d[0]) - yScale(d[1]));

    const bars = $chart.selectAll('.bar');
    applyStyles2Selection(extractStyles(this.props), bars);
    applyEvents2Selection(extractEvents(this.props), bars);

    // exit
    //   .remove();
  }

  render() {
    const { containerHeight, containerWidth, children } = this.props;

    return (
      <g
        ref={(el) => { this.$chart = el; }}
      >
        { React.Children.map(children, child =>
          React.cloneElement(child, { containerWidth, containerHeight })
        ) }
      </g>
    );
  }
}

StackedBarChart.propTypes = {
  ...dynamicStyleTypes,
  ...eventTypes,
  data: PropTypes.array.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired, // TODO - PropTypes.arrayOf(string and number).isRequired
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func
};

StackedBarChart.defaultProps = {
  x: d => d.key
};
