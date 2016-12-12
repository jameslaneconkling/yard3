import React, {
  PropTypes
} from 'react';
import * as d3 from 'd3';
import {
  applyStyles2Selection,
  extractStyles,
  dynamicStyleTypes
} from '../../../utils/styles';


export default class YGrid extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { containerWidth, containerHeight } = this.context;
    const $yGrid = d3.select(this.$yGrid);
    const yScale = this.props.yScale || this.context.yScale;

    yScale.rangeRound([containerHeight, 0]);

    $yGrid.call(
      d3.axisRight(yScale)
        .tickFormat('')
        .tickSizeInner(containerWidth)
    );

    $yGrid.selectAll('path')
      .attr('stroke', 'none');

    applyStyles2Selection(extractStyles(this.props), $yGrid.selectAll('line'));
  }

  render() {
    return (
      <g
        ref={(el) => { this.$yGrid = el; }}
        className="ygrid"
      />
    );
  }
}

YGrid.propTypes = {
  ...dynamicStyleTypes,
  yScale: PropTypes.func
};

YGrid.defaultProps = {
  stroke: '#ccc'
};

YGrid.contextTypes = {
  yScale: PropTypes.func,
  containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
