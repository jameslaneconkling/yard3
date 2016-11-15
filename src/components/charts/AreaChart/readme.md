## AreaChart

```
const data = require('../../../../example/data/temp');
const d3 = require('d3');

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
  />
</Chart>
```
