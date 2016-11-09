import React              from 'react';
import * as d3            from 'd3';
import {
  ScatterPlot,
  XAxis,
  YAxis,
  Chart
}                         from '../../src';
import nations            from '../data/nations';

export default class RandomBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: nations,
      chartWidth: 600,
      chartHeight: 300
    };
  }

  render() {
    const { data } = this.state;

    // TODO - scales should be validated to make sure they are appropriate for the chart type
    const x = d => d.income[0][1];
    const y = d => d.lifeExpectancy[0][1];
    const xExtent = d3.extent(data, x);
    const yExtent = d3.extent(data, y);

    const xScale = d3.scaleLinear()
      .domain([xExtent[0] - 100, xExtent[1] + 100]);

    const yScale = d3.scaleLinear()
      .domain([yExtent[0] - 5, yExtent[1] + 5]);

    return (
      <section>
        <h2>Chart 5</h2>

        <Chart
          width={this.state.chartWidth}
          height={this.state.chartHeight}
        >
          <ScatterPlot
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
          />
          <XAxis xScale={xScale} />
          <YAxis yScale={yScale} />
        </Chart>
      </section>
    );
  }
}
