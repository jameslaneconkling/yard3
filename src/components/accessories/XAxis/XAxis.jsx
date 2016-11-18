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
    const { xScale, containerWidth } = this.props;
    const $xAxis = d3.select(this.$xAxis);

    xScale.rangeRound([0, containerWidth]);

    $xAxis.call(
      d3.axisBottom(xScale)
        .tickPadding(10)
    );
  }

  render() {
    return (
      <g
        ref={(el) => { this.$xAxis = el; }}
        className="xaxis"
        transform={`translate(0,${this.props.containerHeight})`}
      />
    );
  }
}

XAxis.propTypes = {
  xScale: PropTypes.func.isRequired
};
