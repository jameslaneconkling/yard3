```
const ContainerDimensions = require('react-container-dimensions').default;

const d3 = require('d3');
const data = require('../../../../example/data/groupedStackedBarChartData.js');

const yMax = d3.max(data, (group) => d3.max(group.data, (bar) => bar.total));
// console.log(yMax);

const yMin = 0;

const xGroupScale = d3
  .scaleBand()
  .padding(0.1)
  .domain(data.map((group) => group.groupKey));

// todo: do better :(
const flattenUnique = (arrs) => {
  const newArr = [];
  arrs.forEach((arr) => {
    arr.forEach((ar) => {
      if (!newArr.find((a) => a === ar)) {
        newArr.push(ar);
      }
    });
  });
  return newArr;
};
const keys = flattenUnique(data.map((group) => group.data.map((stack) => stack.barKey)));
// console.log('keys');
// console.log(keys);

const xScale = d3
  .scaleBand()
  .padding(0.1)
  .domain(keys);

const yScale = d3
  .scaleLinear()
  .domain([yMin, yMax]);

// const colorScale = d3.scaleOrdinal().range([]); // probably need something other than ordinal

const colorScale = d3.scaleOrdinal()
  .range(['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown']);

<div style={{height: 300}}>
  <ContainerDimensions>
    {({ height, width }) => (
      <Chart
        width={width}
        height={height}
        xScale={xGroupScale}
        yScale={yScale}
        leftMargin={70}
      >
        <XAxis />
        <YAxis tickFormat={d3.format('.3s')}/>
        <YAxisLabel label="cost (in us dollars)" />
        <GroupedStackedBarChart
          data={data}
          xGroupScale={xGroupScale}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
        />
      </Chart>
    )}
  </ContainerDimensions>
</div>
```
