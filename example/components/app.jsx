import React, {
  Component
}                         from 'react';
import * as d3            from 'd3';
import Rx                 from 'rxjs';
import {
  BarChart,
  LineChart,
  XAxis,
  YAxis,
  Chart
}                         from '../../src';

const generateData = length => d3.range(1, length + 1).map(idx => ({key: idx, value: Math.random()}));

const stream = Rx.Observable.create(observable => {
  const wave = idx => Math.sin(idx) + 1.5;

  observable.next(d3.range(0, 1, 0.1).map(idx => ({key: idx, value: wave(idx)})));

  let idx = 1;
	setInterval(() => {
		observable.next([{key: idx, value: wave(idx)}]);
		idx += 0.1;
	}, 200);
});

export default class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      data: [], // generateData(20),
      chartWidth: 600,
      chartHeight: 300
    };

    // this.randomize = this.randomize.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.shrink = this.shrink.bind(this);
    this.grow = this.grow.bind(this);
    this.stop= this.stop.bind(this);
	}

  componentDidMount() {
		this.source = stream
      .map(data => data.map(datum => ({key: +datum.key.toFixed(2), value: +datum.value.toFixed(2)})))
      .subscribe(newData => {
        const { data } = this.state;
        const joined = [...data, ...newData];

        // tail last x entries in joined data
        this.setState({
          data: joined.slice(Math.max(0, joined.length - 40), joined.length)
        });
      });
  }

	randomize() {
		// this.setState({data: generateData(this.state.data.length)});
	}

  add() {
    // const idx = this.state.data[this.state.data.length -1].key + 1;
    // this.setState({
    //   data: [...this.state.data, {key: idx, value: Math.random()}]
    // });
  }

  remove() {
    // const data = this.state.data;
    // const idx = Math.floor(Math.random() * data.length);
    // this.setState({
    //   data: [...data.slice(0,idx), ...data.slice(idx + 1, data.length)]
    // });
  }

  shrink() {
    this.setState({chartWidth: this.state.chartWidth - 80});
  }

  grow() {
    this.setState({chartWidth: this.state.chartWidth + 80});
  }

  stop() {
    this.source.unsubscribe();
  }

  render() {
    return (
      <div>
        <h1>React D3</h1>

        <section>
          <h3>Chart 1</h3>

          <Chart
            data={this.state.data}
            width={this.state.chartWidth}
            height={this.state.chartHeight}
          >
            <BarChart>
              <XAxis />
              <YAxis />
            </BarChart>
          </Chart>

          <div>
            <button onClick={this.randomize}>randomize</button>
            <button onClick={this.add}>+</button>
            <button onClick={this.remove}>-</button>
            <button onClick={this.shrink}>shrink</button>
            <button onClick={this.grow}>grow</button>
            <button onClick={this.stop}>stop</button>
          </div>
        </section>

        <section>
          <h3>Chart 2</h3>

          <Chart
            data={this.state.data}
            width={this.state.chartWidth}
            height={this.state.chartHeight}
          >
            <LineChart>
              <XAxis />
              <YAxis />
            </LineChart>
          </Chart>
        </section>

      </div>
    );
  }
}
