import React              from 'react';
import Rx                 from 'rxjs';
import * as d3            from 'd3';
import R                  from 'ramda';
import {
  Chart,
  LineChart,
  XAxis,
  YAxis,
  Line
}                         from '../../src';

let idx = 0;
const $stream = Rx.Observable.interval(100)
  .map(() => idx++*0.15)
  .map(x => ([{key: x, value: Math.sin(x)}]));
  // .scan((acc, values) => R.takeLast(50, [...acc, ...values]), []);  // tail last 50 entries


export default class StreamLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [],
      data2: [],
      chartWidth: 600,
      chartHeight: 300
    };

    this.$subscription = null;

    this.toggle= this.toggle.bind(this);
  }

  subscribe($observable) {
    return $observable
      .map(data => [data, data.map(d => ({key: d.key, value: d.value - 1}))])
      .subscribe(([newData1, newData2]) => {
        this.setState({
          data1: R.takeLast(50, [...this.state.data1, ...newData1]),
          data2: R.takeLast(50, [...this.state.data2, ...newData2])
        });
      });
  }

  toggle() {
    this.$subscription = this.$subscription ?
      this.$subscription.unsubscribe() :
      this.subscribe($stream);
  }

  render() {
    const { data1, data2, chartWidth, chartHeight } = this.state;
    const x = d => d ? d.key : 0;
    const y = d => d ? d.value : 0;

    const xDomain = [Math.max(0, x(data1[0])), Math.max(2, x(data1[data1.length -1]))];
    const xScale = d3.scaleLinear()
      .domain(xDomain);

    const yScale = d3.scaleLinear()
      .domain([-2.5, 1.5]);

    return (
      <section>
        <h2>Chart 2</h2>

        <Chart
          width={chartWidth}
          height={chartHeight}
        >
          <XAxis xScale={xScale} />
          <YAxis yScale={yScale} />
          <LineChart
            data={data1}
            x={x}
            y={y}
            xScale={xScale}
            yScale={yScale}
            stroke={'red'}
          />
          <LineChart
            data={data2}
            x={x}
            y={y}
            xScale={xScale}
            yScale={yScale}
            stroke={'blue'}
          />

          <Line
            data={[[xDomain[0], 0], [xDomain[1], 0]]}
            xScale={xScale}
            yScale={yScale}
            stroke='#888'
            strokeWidth='1'
          />
        </Chart>

        <div>
          <button onClick={this.toggle}>{this.$subscription ? 'stop' : 'start'}</button>
        </div>
      </section>
    );
  }

}