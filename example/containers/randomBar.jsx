import React              from 'react';
import * as d3            from 'd3';
import {
  BarChart,
  XAxis,
  Chart
}                         from '../../src';


const generateData = length => d3.range(1, length + 1).map(idx => ({ key: idx, value: Math.random() }));

export default class RandomBar extends React.Component {
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
    this.shrink = this.shrink.bind(this);
    this.grow = this.grow.bind(this);
  }

  randomize() {
    this.setState({ data: generateData(this.state.data.length) });
  }

  add() {
    const idx = this.state.data[this.state.data.length - 1].key + 1;
    this.setState({
      data: [...this.state.data, { key: idx, value: Math.random() }]
    });
  }

  remove() {
    const data = this.state.data;
    const idx = Math.floor(Math.random() * data.length);
    this.setState({
      data: [...data.slice(0, idx), ...data.slice(idx + 1, data.length)]
    });
  }

  shrink() {
    this.setState({ chartWidth: this.state.chartWidth - 80 });
  }

  grow() {
    this.setState({ chartWidth: this.state.chartWidth + 80 });
  }

  render() {
    const { data } = this.state;

    // TODO - scales should be validated to make sure they are appropriate for the chart type
    const xScale = d3.scaleBand()
      .padding(0.1)
      .domain(data.map(d => d.key));

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value));

    return (
      <section>
        <h2>Chart 1</h2>

        <Chart
          width={this.state.chartWidth}
          height={this.state.chartHeight}
          className="bar-chart"
        >
          <XAxis xScale={xScale} />
          <BarChart
            data={this.state.data}
            xScale={xScale}
            yScale={yScale}
            fill="#607D8B"
          />
        </Chart>

        <div>
          <button onClick={this.randomize}>randomize</button>
          <button onClick={this.add}>+</button>
          <button onClick={this.remove}>-</button>
          <button onClick={this.shrink}>shrink</button>
          <button onClick={this.grow}>grow</button>
        </div>
      </section>
    );
  }
}
