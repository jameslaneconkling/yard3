import React, {
  PropTypes
} from 'react';
import * as d3 from 'd3';


export default class YAxis extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { containerHeight } = this.props;
    const $yAxis = d3.select(this.$yAxis);
    const yScale = this.props.yScale || this.context.yScale;

    yScale.rangeRound([containerHeight, 0]);

    $yAxis.call(d3.axisLeft(yScale).tickPadding(10))
      .append('text')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end');
  }

  render() {
    return (
      <g
        ref={(el) => { this.$yAxis = el; }}
        className="yaxis"
      />
    );
  }
}

YAxis.propTypes = {
  yScale: PropTypes.func
};

YAxis.contextTypes = YAxis.propTypes;
