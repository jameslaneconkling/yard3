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
  xScale={xScale}
  yScale={yScale}
>
  <YGrid strokeDasharray={'2, 3'} />
  <XAxis />
  <YAxis />
  <LineChart
    data={data}
    x={x}
    y={nyY}
    stroke="red"
  />
  <LineChart
    data={data}
    x={x}
    y={sfY}
    stroke="blue"
  />
</Chart>
```
