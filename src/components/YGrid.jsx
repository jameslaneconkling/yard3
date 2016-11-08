import React, {
  PropTypes
}                 from 'react';
import * as d3    from 'd3';

export default class YGrid extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { yScale, containerWidth } = this.props;
    const $yGrid = d3.select(this.$yGrid);

    $yGrid.call(
      d3.axisRight(yScale)
        .tickFormat('')
        .tickSizeInner(containerWidth)
    );
  }

  render() {
    return (
      <g
        ref={el => this.$yGrid = el}
        className='ygrid'
      />
    );
  }
}

YGrid.propTypes = {
  yScale: PropTypes.func,
  containerWidth: PropTypes.number
};
