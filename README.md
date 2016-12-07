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

![multi-series line chart](https://cloud.githubusercontent.com/assets/4389360/20370175/46fecf26-ac2b-11e6-8d27-579866b4dd93.png)

```javascript
const data = [
  {
    "date": new Date("2011-10-01T04:00:00.000Z"),
    "New York": 63.4,
    "San Francisco": 62.7
  },
  {
    "date": new Date("2011-10-02T04:00:00.000Z"),
    "New York": 58,
    "San Francisco": 59.9
  }, ...
];

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
[here](https://jameslaneconkling.github.io/yard3/)

### Development

```bash
npm run dev
```
