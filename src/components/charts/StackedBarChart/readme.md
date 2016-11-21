```
const d3 = require('d3');
const data = require('sample_datasets').state_population_by_age
  .sort(function(a, b) { return b.total - a.total; });

const keys = ['Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over'];

const x = d => d.State;
const xScale = d3.scaleBand()
  .padding(0.1)
  .domain(data.map(x));
const xScaleAxis = d3.scaleBand()
  .domain(data.filter((d, i) => i % 2 === 0).map(x));

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.total)]);
const yScaleAxis = d3.scaleBand()
  .domain(yScale.ticks(8).map(yScale.tickFormat(8, 's')));

const colorScale = d3.scaleOrdinal()
  .domain(keys)
  .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);



<Chart
  width="600"
  height="300"
>
  <YAxis yScale={yScaleAxis} />
  <XAxis xScale={xScaleAxis} />
  <StackedBarChart
    data={data}
    keys={keys}
    x={x}
    xScale={xScale}
    yScale={yScale}
    fill={d => {
      return colorScale(d.key)
    }}
    stroke="#ccc"
    strokeWidth="0.3"
  />
</Chart>
```
