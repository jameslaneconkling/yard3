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
    const { containerHeight } = this.context;
    const $yAxis = d3.select(this.$yAxis);
    const yScale = this.props.yScale || this.context.yScale;

    yScale.rangeRound([containerHeight, 0]);

    let axis = d3.axisLeft(yScale).tickPadding(10);

    if(this.props.tickFormat){
      axis = axis.tickFormat(this.props.tickFormat);
    }

    $yAxis.call(axis)
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
  yScale: PropTypes.func,
  tickFormat: PropTypes.func,
};

YAxis.contextTypes = {
  yScale: PropTypes.func,
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
