import React              from 'react';
import * as d3            from 'd3';
import Rx                 from 'rxjs';
import {
  LineChart,
  XAxis,
  YAxis,
  Chart
}                         from '../../src';

const makeStream = idx => Rx.Observable
  .create(observable => {
    let _idx = idx;
    const wave = idx => Math.sin(idx);

    setInterval(() => {
      observable.next([{key: _idx, value: wave(_idx)}]);
      _idx += 0.1;
    }, 200);
  })
  .map(data => data.map(datum => ({key: +datum.key.toFixed(1), value: +datum.value.toFixed(1)})));


export default class StreamLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      idx: 1,
      chartWidth: 600,
      chartHeight: 300
    };

    this.$source = null;

    this.toggle= this.toggle.bind(this);
  }

  subscribe($subject) {
    return $subject.subscribe(newData => {
      const { data } = this.state;
      const joined = [...data, ...newData];

      // tail last x entries in joined data
      this.setState({
        data: joined.slice(Math.max(0, joined.length - 40), joined.length),
        idx: newData[newData.length -1].key
      });
    });
  }

  toggle() {
    if (this.$source) {
      this.$source = this.$source.unsubscribe();
    } else {
      this.$source = this.subscribe(makeStream(this.state.idx));
    }
  }

  render() {
    return (
      <section>
        <h2>Chart 2</h2>

        <Chart
          width={this.state.chartWidth}
          height={this.state.chartHeight}
        >
          <LineChart
            data={this.state.data}
            yDomain={() => [-1.5, 1.5]}
          >
            <XAxis />
            <YAxis />
          </LineChart>
        </Chart>

        <div>
          <button onClick={this.toggle}>{this.$source ? 'stop' : 'start'}</button>
        </div>
      </section>
    );
  }

}