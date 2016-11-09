import React, {
  PropTypes
}                 from 'react';
import * as d3    from 'd3';

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
  }

  render() {
    return (
      <g
        ref={el => this.$xGrid = el}
        className='xgrid'
      >
      </g>
    );
  }
}

XGrid.propTypes = {
  xScale: PropTypes.func.isRequired,
  containerHeight: PropTypes.number
};
