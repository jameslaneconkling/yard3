```
const d3 = require('d3');
const data = require('sample_datasets').letter_frequency;

const x = d => d.letter;
const y = d => d.frequency;
const xScale = d3.scaleBand()
  .padding(0.1)
  .domain(data.map(x));

const yScale = d3.scaleLinear()
  .domain(d3.extent(data, y));

<Chart
  width="600"
  height="300"
  xScale={xScale}
  yScale={yScale}
>
  <XAxis />
  <YAxis />
  <BarChart
    data={data}
    x={x}
    y={y}
    fill="#607D8B"
    stroke={d3.color('#607D8B').darker(1).toString()}
    strokeWidth="0.5"
  />
</Chart>
```
