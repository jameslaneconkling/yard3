import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import 'style!css!../../node_modules/react-resizable/css/styles.css';
import { Resizable, ResizableBox } from 'react-resizable';
import * as d3 from 'd3';
import {
  BarChart,
  XAxis,
  Chart
} from '../../src';


const generateData = length =>
  d3.range(1, length + 1)
    .map(idx => ({ key: idx, value: Math.random() }));

const data = generateData(20);

export default class RandomBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { width: 600, height: 400 };

    this.onResize = this.onResize.bind(this);
  }

  onResize(e, { size }) {
    this.setState(size);
  }

  render() {
    // TODO - scales should be validated to make sure they are appropriate for the chart type
    const xScale = d3.scaleBand()
      .padding(0.1)
      .domain(data.map(d => d.key));

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value));

    return (
      <section
        style={{
          position: 'relative',
          height: 400,
          width: 600
        }}
      >
        <h2>Resize</h2>

        <ResizableBox
          width={this.state.width}
          height={this.state.height}
          onResize={this.onResize}
          axis="both"
        >
          <ContainerDimensions>
            {({ height, width }) => (
              <Chart
                height={height}
                width={width}
                className="bar-chart"
                xScale={xScale}
                yScale={yScale}
              >
                <XAxis />
                <BarChart
                  data={data}
                  fill="#607D8B"
                />
              </Chart>
            )}
          </ContainerDimensions>
        </ResizableBox>
      </section>
    );
  }
}
