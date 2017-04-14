import React, {
  PropTypes
} from 'react';
import * as d3 from 'd3';


export default class XAxis extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { containerWidth } = this.context;
    const xScale = this.props.xScale || this.context.xScale;
    const $xAxis = d3.select(this.$xAxis);

    xScale.rangeRound([0, containerWidth]);

    let axis = d3.axisBottom(xScale).ticks(d3.timeHour.every(3));

    if(this.props.tickFormat){
      axis = axis.tickFormat(this.props.tickFormat);
    }

    $xAxis.call(axis);
  }

  render() {
    return (
      <g
        ref={(el) => { this.$xAxis = el; }}
        className="xaxis"
        transform={`translate(0,${this.context.containerHeight})`}
      />
    );
  }
}

XAxis.propTypes = {
  xScale: PropTypes.func
};

XAxis.contextTypes = {
  xScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
