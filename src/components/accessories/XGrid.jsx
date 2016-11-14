import React, {
  PropTypes
} from 'react';
import * as d3 from 'd3';
import {
  applyStyles2Selection,
  extractStyles,
  dynamicStyleTypes
} from '../../utils/styles';


export default class XGrid extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { xScale, containerHeight, containerWidth } = this.props;
    const $xGrid = d3.select(this.$xGrid);

    xScale.rangeRound([0, containerWidth]);

    $xGrid.call(
      d3.axisBottom(xScale)
        .tickFormat('')
        .tickSizeInner(containerHeight)
    );

    $xGrid.selectAll('path')
      .attr('stroke', 'none');

    applyStyles2Selection(extractStyles(this.props), $xGrid.selectAll('line'));
  }

  render() {
    return (
      <g
        ref={(el) => { this.$xGrid = el; }}
        className="xgrid"
      />
    );
  }
}

XGrid.propTypes = {
  ...dynamicStyleTypes,
  xScale: PropTypes.func.isRequired,
  containerHeight: PropTypes.number
};

XGrid.defaultProps = {
  stroke: '#ccc'
};
