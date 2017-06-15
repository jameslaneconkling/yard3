```
const d3 = require('d3');
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const generateData = length => d3.range(1, length + 1).map(idx => ({key: idx, value: Math.random()}));

<Chart
  width="600"
  height="300"
>
  <DonutChart
    data={generateData(10)}
    value={d => d.value}
    fill={d => colorScale(d.value)}
    stroke="#DDD"
    strokeWidth="1"
    centerText="centerText"
    centerLabel="centerLabel"
  />
</Chart>
```
