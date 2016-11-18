```
const d3 = require('d3');
const colorScale = d3.scaleSequential(d3.interpolateViridis);
const generateData = length => d3.range(1, length + 1).map(idx => ({key: idx, value: Math.random()}));

<Chart
  width="600"
  height="300"
>
  <DonutChart
    data={generateData(8)}
    value={d => d.value}
    fill={d => colorScale(d.value)}
    stroke="#DDD"
    strokeWidth="1"
  />
</Chart>
```
