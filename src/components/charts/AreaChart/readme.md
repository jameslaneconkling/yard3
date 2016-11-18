A simple area or bivariate area chart.

Pass only `x0` and `y0` props to generate an area chart; pass `x0`, `y0`, and `y1` to generate a horizontal bivariate chart;  pass `x0`, `x1`, and `y0` to generate a vertical bivariate chart.

```
const d3 = require('d3');
const data = require('sample_datasets').new_york_temperature;
/*
data = [{
    "date": "2010-10-01T04:00:00.000Z",
    "high": 59.5,
    "low": 57
  },
  {
    "date": "2010-10-02T04:00:00.000Z",
    "high": 59.5,
    "low": 53.4
  }, ...]
*/

data.forEach(d => d.date = new Date(d.date));

const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.date));

const yScale = d3.scaleLinear()
  .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)]);

<Chart
  width="600"
  height="300"
>
  <YGrid
    yScale={yScale}
    strokeDasharray={'2, 3'}
  />
  <XAxis xScale={xScale} />
  <YAxis yScale={yScale} />
  <AreaChart
    data={data}
    xScale={xScale}
    yScale={yScale}
    x0={d => new Date(d.date)}
    y0={d => d.high}
    y1={d => d.low}
    fill="#607D8B"
    stroke={d3.color('#607D8B').darker(1).toString()}
    strokeWidth="0.5"
  />
</Chart>
```
