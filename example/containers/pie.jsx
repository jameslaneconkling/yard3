import React              from 'react';
import * as d3            from 'd3';
import {
  DonutChart,
  Chart
}                         from '../../src';


const generateData = length => d3.range(1, length + 1).map(idx => ({key: idx, value: Math.random()}));

export default class Pie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: generateData(20),
      chartWidth: 600,
      chartHeight: 300
    };

    this.randomize = this.randomize.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
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

  render() {

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    return (
      <section>
        <h2>Chart 1</h2>

        <Chart
          width={this.state.chartWidth}
          height={this.state.chartHeight}
        >
          <DonutChart
            data={this.state.data}
            value={d => d.value}
            fill={d => colorScale(d.value)}
          />
        </Chart>

        <div>
          <button onClick={this.randomize}>randomize</button>
          <button onClick={this.add}>+</button>
          <button onClick={this.remove}>-</button>
        </div>
      </section>
    );
  }
}
