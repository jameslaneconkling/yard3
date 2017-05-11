```
const d3 = require('d3');
const data = require('sample_datasets').city_temperature.slice(0,12);
const nyY = d => d['New York'];
const sfY = d => d['San Francisco'];
// const atY = d => d.Austin;
const x = d => d.xValue;

data.forEach(d => d.date = new Date(d.date));


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
// const keys = flattenUnique(data.map((group) => group.data.map((stack) => stack.barKey)));
// console.log('keys');
// console.log(keys);


const xScale = d3.scaleTime()
  .domain(d3.extent([0, 3]));

const yScale = d3.scaleLinear()
  .domain([0, 10]);

<Chart
  width="600"
  height="300"
  xScale={xScale}
  yScale={yScale}
>
  <YGrid strokeDasharray={'2, 3'} />
  <XAxis />
  <YAxis />
  <LineChartWithDots
    data={data}
  />
</Chart>
```
