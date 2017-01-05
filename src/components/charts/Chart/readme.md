All charts and accessories should be nested within a containing `<Chart>` element.  Internally, the Chart component defines the visualization's width, height, and margins, as well as the default styles, passing these properties to all children.

```
const d3 = require('d3');

const xAxisScale = d3.scaleLinear().domain([-100, 100]);
const yAxisScale = d3.scaleLinear().domain([-1, 1]);
const xGridScale = d3.scaleBand().domain(xAxisScale.ticks(4).map(xAxisScale.tickFormat(4, 's')));
const yGridScale = d3.scaleBand().domain(yAxisScale.ticks(4).map(yAxisScale.tickFormat(4, 's')));

<Chart
  width="600"
  height="300"
>
  <XGrid xScale={xGridScale} strokeDasharray={'2, 3'} />
  <YGrid yScale={yGridScale} strokeDasharray={'2, 3'} />
  <XAxis xScale={xAxisScale} strokeDasharray={'2, 3'} />
  <YAxis yScale={yAxisScale} />
</Chart>
```
