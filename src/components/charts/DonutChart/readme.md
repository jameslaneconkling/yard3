```
const d3 = require('d3');

<Chart
  width="600"
  height="300"
>
  <DonutChart
    data={data}
    value={d => d.value}
    fill={d => colorScale(d.value)}
  />
</Chart>
```
