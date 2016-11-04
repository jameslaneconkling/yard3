import React, {
  Component
}                         from 'react';
import * as d3            from 'd3';
import {
  BarChart,
  XAxis,
  YAxis,
  Chart
}                         from '../../src';

const generateData = length => d3.range(1, length + 1).map(idx => ({key: idx, value: Math.random()}));

export default class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      data: generateData(10),
      chartWidth: 900,
      chartHeight: 500
    };

    this.randomize = this.randomize.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.shrink = this.shrink.bind(this);
    this.grow = this.grow.bind(this);
	}

	randomize() {
		this.setState({data: generateData(this.state.data.length)});
	}

  add() {
    const idx = this.state.data[this.state.data.length -1].key + 1;
    this.setState({
      data: [...this.state.data, {key: idx, value: Math.random()}]
    });
  }

  remove() {
    const data = this.state.data;
    const idx = Math.floor(Math.random() * data.length);
    this.setState({
      data: [...data.slice(0,idx), ...data.slice(idx + 1, data.length)]
    });
  }

  shrink() {
    this.setState({chartWidth: this.state.chartWidth - 80});
  }

  grow() {
    this.setState({chartWidth: this.state.chartWidth + 80});
  }

  render() {
    return (
      <section>
        <h1>React D3</h1>

        <div>
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
          </div>
        </div>

      </section>
    );
  }
}
