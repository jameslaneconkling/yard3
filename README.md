## Yet Another React D3 Integration Library

The philosophy of this library is to take care of rendering, while leaving all data handling to the developer.  In practice:

### Internal
* rendering, in particular providing the glue between react and D3
* managing chart pixel dimensions, specifically scale ranges
* managing chart svg positioning, for example css transforms

### External
* data transforms, such as x and y accessor functions
* scale domains and interpolation methods
* DOM interaction

Yard is built to be highly composable, breaking components down into small pieces that can be easily customized and combined to make complex visualizations.  E.g, to create a multi-series line chart with axes and a simple horizontal grid:

```javascript
const nyY = d => d['New York'];
const sfY = d => d['San Francisco'];
const x = d => d.date;

const xScale = d3.scaleTime()
  .domain(d3.extent(data, x));

const yScale = d3.scaleLinear()
  .domain([10, 100]);

<Chart
  width="600"
  height="300"
>
  <YGrid yScale={yScale} strokeDasharray={'2, 3'} />
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

### Documentation
[here](https://jameslaneconkling.github.io/yard/)

### Development

```bash
npm run dev
```
