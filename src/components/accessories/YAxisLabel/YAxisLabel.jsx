import React, {
  PropTypes
} from 'react';
import * as d3 from 'd3';


export default class YAxisLabel extends React.Component {
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const { containerHeight, leftMargin } = this.context;

    const $yAxisLabel = d3.select(this.$yAxisLabel);
    $yAxisLabel.select('.yaxis-label').remove();
    $yAxisLabel
      .append('text')
      .attr('class', 'yaxis-label')
      .attr("text-anchor", "middle")
      .attr("transform", `translate(-${leftMargin / 1.5}, ${containerHeight / 2})rotate(-90)`)
      .text(this.props.label);
  }

  render() {
    return (
      <g
        ref={(el) => {
          this.$yAxisLabel = el;
        }}
      />
    );
  }
}

YAxisLabel.propTypes = {
  yScale: PropTypes.func,
  tickFormat: PropTypes.func,
  label: PropTypes.string
};

YAxisLabel.contextTypes = {
  yScale: PropTypes.func,
  containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  leftMargin: PropTypes.number
};
