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
    const { yScale, containerWidth, containerHeight } = this.props;
    const $yGrid = d3.select(this.$yGrid);

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
  yScale: PropTypes.func.isRequired
};

YGrid.defaultProps = {
  stroke: '#ccc'
};
