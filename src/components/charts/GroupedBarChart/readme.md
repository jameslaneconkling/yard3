```
const d3 = require('d3');
const data = require('sample_datasets').state_population_by_age.slice(0,5);

const keys = [
  "Under 5 Years",
  "5 to 13 Years",
  "14 to 17 Years",
  "18 to 24 Years",
  "25 to 44 Years",
  "45 to 64 Years",
  "65 Years and Over"
];

const groupKey = d => d.State;

const xGroupScale = d3
  .scaleBand()
  .padding(0.1)
  .domain(data.map(groupKey));

const xScale = d3
  .scaleBand()
  .padding(0.1)
  .domain(keys)

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]);

const colorScale = d3.scaleOrdinal()
  .range(['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown']);

<Chart
  width="600"
  height="300"
  xScale={xGroupScale}
  yScale={yScale}
  leftMargin={50}
>
  <XAxis />
  <YAxis tickFormat={d3.format('.3s')}/>
  <GroupedBarChart
    data={data}
    keys={keys}
    groupKey={groupKey}
    xGroupScale={xGroupScale}
    xScale={xScale}
    yScale={yScale}
    colorScale={colorScale}
    fill="#607D8B"
    stroke={d3.color('#607D8B').darker(1).toString()}
    strokeWidth="0.5"
  />
</Chart>

```