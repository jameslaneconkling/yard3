import React              from 'react';
import * as d3            from 'd3';
import {
  BarChart,
  XAxis,
  Chart,
  Tooltip
}                         from '../../src';


const generateData = length =>
  d3.range(1, length + 1)
    .map(idx => ({ key: idx, value: Math.random() }));

export default class RandomBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: generateData(20),
      chartWidth: 600,
      chartHeight: 300,
      tooltipPosition: { x: null, y: null }
    };

    this.randomize = this.randomize.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.shrink = this.shrink.bind(this);
    this.grow = this.grow.bind(this);

    this.moveTooltip = this.moveTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
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

  moveTooltip() {
    // this works if the tooltip is positioned relative to the page
    // meaning that none of it's parent elements are relatively positioned
    // this.setState({ tooltipPosition: { x: d3.event.x, y: d3.event.y } });

    // otherwise, pass the nearest relatively positioned element to d3.mouse()
    // to calculate the mouse position relative to that element
    const [x, y] = d3.mouse(this.$container);
    this.setState({ tooltipPosition: { x, y } });
  }

  hideTooltip() {
    this.setState({ tooltipPosition: false });
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
      <section
        style={{ position: 'relative' }}
        ref={(el) => { this.$container = el; }}
      >
        <h2>Chart 1</h2>

        <Tooltip
          x={this.state.tooltipPosition.x}
          y={this.state.tooltipPosition.y}
          xOffset={4}
          yOffset={-40}
        >
          <div style={{ background: '#ddd', padding: 10, border: '1px solid #bbb', color: '#333' }}>
            <strong>xy - {this.state.tooltipPosition.x} : {this.state.tooltipPosition.y}</strong>
          </div>
        </Tooltip>

        <Chart
          width={this.state.chartWidth}
          height={this.state.chartHeight}
          className="bar-chart"
          xScale={xScale}
          yScale={yScale}
        >
          <XAxis />
          <BarChart
            data={this.state.data}
            fill="#607D8B"
            onMouseMove={this.moveTooltip}
            onMouseLeave={this.hideTooltip}
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
