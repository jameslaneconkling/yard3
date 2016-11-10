import React              from 'react';
import * as d3            from 'd3';
import {
  ScatterPlot,
  XAxis,
  YAxis,
  Chart
}                         from '../../src';
import nations            from '../data/nations';

export default class PlotExample extends React.Component {
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
    const income = d => d.income[0][1];
    const lifeExpectancy = d => d.lifeExpectancy[0][1];
    const population = d => d.population[0][1];
    const region = d => d.region;
    const xExtent = d3.extent(data, income);
    const yExtent = d3.extent(data, lifeExpectancy);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const xScale = d3.scaleLinear()
      .domain([xExtent[0] - 100, xExtent[1] + 100]);

    const yScale = d3.scaleLinear()
      .domain([yExtent[0] - 5, yExtent[1] + 5]);

    const rScale = d3.scaleSqrt().domain([0, 5e8]).range([2, 40]);

    return (
      <section>
        <h2>Chart 5</h2>

        <Chart
          width={this.state.chartWidth}
          height={this.state.chartHeight}
        >
          <ScatterPlot
            data={data.sort((d0, d1) => population(d1) - population(d0))}
            xScale={xScale}
            yScale={yScale}
            x={income}
            y={lifeExpectancy}
            r={d => rScale(population(d))}
            fill={d => colorScale(region(d))}
            fillOpacity={0.8}
            stroke='#444'
            strokeWidth={1}
          />
          <XAxis xScale={xScale} />
          <YAxis yScale={yScale} />
        </Chart>
      </section>
    );
  }
}
