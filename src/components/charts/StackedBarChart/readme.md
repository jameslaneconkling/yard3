```
const d3 = require('d3');
const data = require('sample_datasets').state_population_by_age;


const x = d => d.State;
const xScale = d3.scaleBand()
  .padding(0.1)
  .domain(data.map(x));
const xScaleAxis = d3.scaleBand()
  .domain(data.filter((d, i) => i % 2 === 0).map(x));

const y = d => d['5 to 13 Years'];
const yScale = d3.scaleLinear()
  .domain(d3.extent(data, y));
const yScaleAxis = d3.scaleBand()
  .domain(yScale.ticks(8).map(yScale.tickFormat(8, 's')));


<Chart
  width="600"
  height="300"
>
  <YAxis yScale={yScaleAxis} />
  <XAxis xScale={xScaleAxis} />
  <StackedBarChart
    data={data}
    x={x}
    y={y}
    xScale={xScale}
    yScale={yScale}
  />
</Chart>
```
