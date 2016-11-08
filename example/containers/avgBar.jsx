import React              from 'react';
import * as d3            from 'd3';
import {
  LineChart,
  XAxis,
  YAxis,
  Chart,
  Rectangle,
  Line,
  XGrid,
  YGrid
}                         from '../../src';


export default class AvgBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartWidth: 600,
      chartHeight: 300
    };
  }

  render() {
    const { data, chartWidth, chartHeight } = this.state;
    const xExtent = [-10, 10];
    const yExtent = [-1.5, 1.5];
    const xScale = d3.scaleLinear()
      .domain(xExtent);

    const yScale = d3.scaleLinear()
      .domain(yExtent);

    return (
      <section>
        <h2>Chart 3</h2>

        <Chart
          width={chartWidth}
          height={chartHeight}
        >
          <LineChart
            data={data}
            xScale={xScale}
            yScale={yScale}
          >
            <Rectangle
              x={xExtent}
              y={[-1, 1]}
              fill='orange'
              fillOpacity='0.3'
            />
            <XGrid />
            <YGrid />
            <Line
              data={[[-10,0], [10,0]]}
              stroke='red'
              strokeWidth='5'
              strokeOpacity='0.3'
            />
            <Line
              data={[[-10,-0.5], [-2,0.2], [4, -0.1], [10,0.5]]}
              stroke='red'
            />
            <XAxis />
            <YAxis />
          </LineChart>
        </Chart>
      </section>
    );
  }

}