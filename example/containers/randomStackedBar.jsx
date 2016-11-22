import React              from 'react';
import * as d3            from 'd3';
import {
  StackedBarChart,
  XAxis,
  YAxis,
  Chart
}                         from '../../src';


const generateData = length => d3.range(1, length + 1).map(idx => ({
  key: idx,
  1: Math.random(),
  2: Math.random() * 2,
  3: Math.random() * 3
}));

export default class RandomStackedBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: generateData(20)
    };

    this.randomize = this.randomize.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  randomize() {
    this.setState({ data: generateData(this.state.data.length) });
  }

  add() {
    const key = this.state.data[this.state.data.length - 1].key + 1;
    const newDataPoint = generateData(1)[0];
    newDataPoint.key = key;
    newDataPoint[4] = Math.random() * 4;
    this.setState({
      data: [...this.state.data, newDataPoint]
    });
  }

  remove() {
    const data = this.state.data;
    const idx = Math.floor(Math.random() * data.length);
    this.setState({
      data: [...data.slice(0, idx), ...data.slice(idx + 1, data.length)]
    });
  }

  render() {
    const { data } = this.state;

    const keys = data
      .map(Object.keys)
      .reduce((acc, d) => {
        d.forEach((key) => {
          if (acc.indexOf(key) === -1) {
            acc.push(key);
          }
        });
        return acc;
      })
      .filter(key => key !== 'key');

    const x = d => d.key;
    const xScale = d3.scaleBand()
      .padding(0.1)
      .domain(data.map(x));

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d =>
        d3.sum(Object.keys(d).filter(k => k !== 'key').map(k => d[k]))
      )]);

    const colorScale = d3.scaleOrdinal()
      .domain(keys)
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);


    return (
      <section>
        <h2>Chart 7</h2>

        <Chart
          width="600"
          height="300"
        >
          <YAxis yScale={yScale} />
          <XAxis xScale={xScale} />
          <StackedBarChart
            data={data}
            keys={keys}
            x={x}
            xScale={xScale}
            yScale={yScale}
            fill={d => {
              return colorScale(d.key)
            }}
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
