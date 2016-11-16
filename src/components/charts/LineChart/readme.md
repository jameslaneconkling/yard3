```
const d3 = require('d3');
const data = require('sample_datasets').city_temperature;
const nyY = d => d['New York'];
const sfY = d => d['San Francisco'];
// const atY = d => d.Austin;
const x = d => d.date;

data.forEach(d => d.date = new Date(d.date));

const xScale = d3.scaleTime()
  .domain(d3.extent(data, x));

const yScale = d3.scaleLinear()
  .domain([10, 100]);

<Chart
  width="600"
  height="300"
>
  <XAxis xScale={xScale} />
  <YAxis yScale={yScale} />
  <LineChart
    data={data}
    x={x}
    y={nyY}
    xScale={xScale}
    yScale={yScale}
    stroke="red"
  />
  <LineChart
    data={data}
    x={x}
    y={sfY}
    xScale={xScale}
    yScale={yScale}
    stroke="blue"
  />
</Chart>
```
