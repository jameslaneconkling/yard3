import React, {
  PropTypes
}                          from 'react';
import * as d3             from 'd3';
import {
  stylePropTypes,
  extractStyles
}                          from '../../utils';


export default class ScatterPlot extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { data, x, y, r, containerWidth, containerHeight, yScale, xScale } = this.props;
    const $chart = d3.select(this.$chart);

    xScale.rangeRound([0, containerWidth]);
    yScale.rangeRound([containerHeight, 0]);

    const update = $chart.selectAll('.bar')
      .data(data);
    const enter = update.enter();
    const exit = update.exit();

    enter
      .append('circle')
      .attr('class', 'dot')
    .merge(update)
      .attr('cx', d => xScale(x(d)))
      .attr('cy', d => yScale(y(d)))
      .attr('r', r);

    // TODO - find a better pattern to apply dynamic styles
    const circles = $chart.selectAll('circle');
    const styles = extractStyles(this.props);
    Object.keys(styles)
      .filter(name => styles[name])
      .map(name => ({
        name: name.replace(/([a-z][A-Z])/g, s => `${s[0]}-${s[1].toLowerCase()}`), // react expects camelCase props, while D3 (and the SVG spec) expect dasherized props
        value: styles[name]
      }))
      .forEach(({name, value}) => circles.attr(name, value));

    exit
      .remove();
  }

  render() {
    const { containerHeight, containerWidth, children } = this.props;

    return (
      <g
        ref={el => this.$chart = el}
      >
        { React.Children.map(children, child => React.cloneElement(child, {containerWidth, containerHeight})) }
      </g>
    );
  }
}

ScatterPlot.propTypes = {
  ...stylePropTypes,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  r: PropTypes.func,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number
};

ScatterPlot.defaultProps = {
  x: d => d.key,
  y: d => d.value,
  r: () => 5
};
