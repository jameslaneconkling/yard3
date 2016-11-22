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

    // add/update/remove Series
    const serieUpdate = $chart.selectAll('.serie')
      .data(d3.stack().keys(keys)(data));
    // const serieEnter = serieUpdate.enter();
    // const serieExit = serieUpdate.exit();

    // serieEnter
    //   .append('g')
    //   .attr('class', 'serie');

    // serieExit
    //   .remove();

    // d3.stack().keys(keys)(data).forEach(s => {
    //   $chart.select('g.serie')
    // });

    // add/update/remove Bars
    const barUpdate = serieUpdate.merge(serieUpdate.enter())
      .selectAll('.bar')
      .data((serie) => {
        // attach serie key to each bar
        serie.forEach((d) => { d.key = serie.key; });
        return serie;
      });
    const barEnter = barUpdate.enter();
    const barExit = barUpdate.exit();

    barEnter
      .append('rect')
      .attr('class', 'bar')
    .merge(barUpdate)
      .attr('x', d => xScale(x(d.data)))
      .attr('y', d => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(d[0]) - yScale(d[1]));

    barExit
      .remove();

    const bars = $chart.selectAll('.bar');
    applyStyles2Selection(extractStyles(this.props), bars);
    applyEvents2Selection(extractEvents(this.props), bars);
  }

  render() {
    const { containerHeight, containerWidth, children, keys } = this.props;

    return (
      <g
        ref={(el) => { this.$chart = el; }}
      >
        {keys.map(key => (
          <g
            className="serie"
            key={key}
          />
        ))}
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
