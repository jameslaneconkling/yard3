import React              from 'react';
import * as d3            from 'd3';
import {
  Chart,
  AreaChart,
  YGrid,
  XAxis,
  YAxis
}                         from '../../src';
import temp               from '../data/temp';


export default class AreaChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: temp.map(d => ({low: d.low, high: d.high, date: new Date(d.date)})),
      chartWidth: 600,
      chartHeight: 300
    };
  }

  render() {
    const { data, chartWidth, chartHeight } = this.state;
    const yScaleMargin = 2;
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date));

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.low) - yScaleMargin, d3.max(data, d => d.high) + yScaleMargin]);

    return (
      <section>
        <h2>Chart 4</h2>
        <Chart
          width={chartWidth}
          height={chartHeight}
          xScale={xScale}
          yScale={yScale}
        >
          <YGrid strokeDasharray={'2, 3'} />
          <XAxis />
          <YAxis />
          <AreaChart
            data={data}
            x0={d => d.date}
            y0={d => d.high}
            y1={d => d.low}
          />
        </Chart>

        <Chart
          width={chartWidth}
          height={chartHeight}
          xScale={xScale}
          yScale={yScale}
        >
          <YGrid strokeDasharray={'2, 3'} />
          <XAxis />
          <YAxis />
          <AreaChart
            data={data}
            x0={d => d.date}
            y0={d => d.high}
            fill={() => 'red'}
          />
        </Chart>
      </section>
    );
  }
}
