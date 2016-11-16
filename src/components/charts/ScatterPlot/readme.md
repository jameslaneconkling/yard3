```
const R = require('ramda');
const d3 = require('d3');
const data = require('sample_datasets').wealth_and_health_of_nations
  .filter(nation => nation.income.length > 1);

const year = 0;
const income = d => R.path(['income', year, 1])(d) || 0;
const lifeExpectancy = d => R.path(['lifeExpectancy', year, 1])(d) || 0;
const population = d => R.path(['population', year, 1])(d) || 0;
const region = d => d.region;
const xExtent = d3.extent(data, income);
const yExtent = d3.extent(data, lifeExpectancy);

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const xScale = d3.scaleLinear()
  .domain([xExtent[0] - 100, xExtent[1] + 100]);

const yScale = d3.scaleLinear()
  .domain([yExtent[0] - 5, yExtent[1] + 5]);

const rScale = d3.scaleSqrt().domain([0, 5e8]).range([2, 40]);

<Chart
  width="600"
  height="300"
>
  <ScatterPlot
    data={data.sort((d0, d1) => population(d1) - population(d0))}
    xScale={xScale}
    yScale={yScale}
    x={income}
    y={lifeExpectancy}
    r={d => rScale(population(d))}
    fill={d => colorScale(region(d))}
    fillOpacity={0.8}
    stroke="#444"
    strokeWidth={1}
  />
  <XAxis xScale={xScale} />
  <YAxis yScale={yScale} />
</Chart>
```
