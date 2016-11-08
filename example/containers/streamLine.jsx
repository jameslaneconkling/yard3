import React              from 'react';
import Rx                 from 'rxjs';
import * as d3            from 'd3';
import R                  from 'ramda';
import {
  LineChart,
  XAxis,
  YAxis,
  Chart
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
      data: [],
      chartWidth: 600,
      chartHeight: 300
    };

    this.$subscription = null;

    this.toggle= this.toggle.bind(this);
  }

  subscribe($observable) {
    return $observable.subscribe(newData => {
      this.setState({
        data: R.takeLast(50, [...this.state.data, ...newData])
      });
    });
  }

  toggle() {
    this.$subscription = this.$subscription ?
      this.$subscription.unsubscribe() :
      this.subscribe($stream);
  }

  render() {
    const { data, chartWidth, chartHeight } = this.state;

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.key));

    const yScale = d3.scaleLinear()
      .domain([-1.5, 1.5]);

    return (
      <section>
        <h2>Chart 2</h2>

        <Chart
          width={chartWidth}
          height={chartHeight}
        >
          <LineChart
            data={data}
            xScale={xScale}
            yScale={yScale}
          >
            <XAxis xScale={xScale} />
            <YAxis yScale={yScale} />
          </LineChart>
        </Chart>

        <div>
          <button onClick={this.toggle}>{this.$subscription ? 'stop' : 'start'}</button>
        </div>
      </section>
    );
  }

}