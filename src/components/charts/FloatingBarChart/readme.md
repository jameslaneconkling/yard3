```
const d3 = require('d3');
const data = require('sample_datasets').new_york_temperature.slice(0,10);

const x = d => d.date;
const yTop = d => d.high;
const yBottom = d => d.low;
const xScale = d3.scaleBand()
  .padding(0.1)
  .domain(data.map(x));

const yScale = d3.scaleLinear()
  .domain([
    d3.min(data, yBottom),
    d3.max(data, yTop)
  ]);

<Chart
  width="600"
  height="300"
  xScale={xScale}
  yScale={yScale}
>
  <XAxis />
  <YAxis />
  <FloatingBarChart
    data={data}
    x={x}
    yTop={yTop}
    yBottom={yBottom}
    fill="#607D8B"
    stroke={d3.color('#607D8B').darker(1).toString()}
    strokeWidth="0.5"
  />
</Chart>
```
