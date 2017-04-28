```
const d3 = require('d3');
const data = [
  {
    "groupKey": "March-2017",
    "data": [{
      "barKey": "pizza",
      "groupKey": "March-2017",
      "total": 0,
      "data": [{ "blockKey": "pizza", "groupKey": "March-2017", "barKey": "pizza", "value": 0 }]
    }, {
      "barKey": "storage",
      "groupKey": "March-2017",
      "total": 0.051786,
      "data": [{ "blockKey": "storage", "groupKey": "March-2017", "value": 0.051786 }]
    }, {
      "barKey": "peppers",
      "groupKey": "March-2017",
      "total": 4.43196,
      "data": [{ "blockKey": "peppers", "groupKey": "March-2017", "value": 4.43196 }]
    }, {
      "barKey": "garlicBread",
      "groupKey": "March-2017",
      "total": 0.000007,
      "data": [{ "blockKey": "garlicBread", "groupKey": "March-2017", "value": 0.000007 }]
    }, {
      "barKey": "electricity",
      "groupKey": "March-2017",
      "total": 2.993824,
      "data": [{ "blockKey": "electricity", "groupKey": "March-2017", "value": 2.993824 }]
    }, {
      "barKey": "rentals",
      "groupKey": "March-2017",
      "total": 10.6,
      "data": [{ "blockKey": "rentals", "groupKey": "March-2017", "value": 10.6 }]
    }, {
      "barKey": "labor",
      "groupKey": "March-2017",
      "total": 0.000004,
      "data": [{ "blockKey": "labor", "groupKey": "March-2017", "value": 0.000004 }]
    }, {
      "barKey": "AmazonRDS",
      "groupKey": "March-2017",
      "total": 24.016228,
      "data": [{ "blockKey": "AmazonRDS", "groupKey": "March-2017", "value": 24.016228 }]
    }, {
      "barKey": "delivery",
      "groupKey": "March-2017",
      "total": 0.5,
      "data": [{ "blockKey": "delivery", "groupKey": "March-2017", "value": 0.5 }]
    }, {
      "barKey": "idk",
      "groupKey": "March-2017",
      "total": 0.00002,
      "data": [{ "blockKey": "idk", "groupKey": "March-2017", "value": 0.00002 }]
    }]
  }, {
    "groupKey": "January-2017",
    "data": [{
      "barKey": "electricity",
      "groupKey": "January-2017",
      "total": 4.905462,
      "data": [{
        "blockKey": "electricity",
        "groupKey": "January-2017",
        "barKey": "electricity",
        "value": 4.905462
      }]
    }, {
      "barKey": "garlicBread",
      "groupKey": "January-2017",
      "total": 0.000001,
      "data": [{ "blockKey": "garlicBread", "groupKey": "January-2017", "value": 0.000001 }]
    }, {
      "barKey": "idk",
      "groupKey": "January-2017",
      "total": 0,
      "data": [{ "blockKey": "idk", "groupKey": "January-2017", "value": 0 }]
    }, {
      "barKey": "storage",
      "groupKey": "January-2017",
      "total": 0.051807,
      "data": [{ "blockKey": "storage", "groupKey": "January-2017", "value": 0.051807 }]
    }, {
      "barKey": "labor",
      "groupKey": "January-2017",
      "total": 0,
      "data": [{ "blockKey": "labor", "groupKey": "January-2017", "value": 0 }]
    }, {
      "barKey": "rentals",
      "groupKey": "January-2017",
      "total": 17.2618,
      "data": [{ "blockKey": "rentals", "groupKey": "January-2017", "value": 17.2618 }]
    }, {
      "barKey": "pizza",
      "groupKey": "January-2017",
      "total": 0,
      "data": [{ "blockKey": "pizza", "groupKey": "January-2017", "value": 0 }]
    }, {
      "barKey": "delivery",
      "groupKey": "January-2017",
      "total": 0.5,
      "data": [{ "blockKey": "delivery", "groupKey": "January-2017", "value": 0.5 }]
    }]
  }, {
    "groupKey": "February-2017",
    "data": [{
      "barKey": "idk",
      "groupKey": "February-2017",
      "total": 0,
      "data": [{ "blockKey": "idk", "groupKey": "February-2017", "barKey": "idk", "value": 0 }]
    }, {
      "barKey": "delivery",
      "groupKey": "February-2017",
      "total": 0.5,
      "data": [{ "blockKey": "delivery", "groupKey": "February-2017", "value": 0.5 }]
    }, {
      "barKey": "electricity",
      "groupKey": "February-2017",
      "total": 4.264133,
      "data": [{ "blockKey": "electricity", "groupKey": "February-2017", "value": 4.264133 }]
    }, {
      "barKey": "rentals",
      "groupKey": "February-2017",
      "total": 24.914,
      "data": [{ "blockKey": "rentals", "groupKey": "February-2017", "value": 24.914 }]
    }, {
      "barKey": "garlicBread",
      "groupKey": "February-2017",
      "total": 0.000001,
      "data": [{ "blockKey": "garlicBread", "groupKey": "February-2017", "value": 0.000001 }]
    }, {
      "barKey": "pizza",
      "groupKey": "February-2017",
      "total": 0,
      "data": [{ "blockKey": "pizza", "groupKey": "February-2017", "value": 0 }]
    }, {
      "barKey": "storage",
      "groupKey": "February-2017",
      "total": 0.046836,
      "data": [{ "blockKey": "storage", "groupKey": "February-2017", "value": 0.046836 }]
    }]
  }
];

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

<Chart
  width="600"
  height="300"
  xScale={xGroupScale}
  yScale={yScale}
  leftMargin={50}
>
  <XAxis />
  <YAxis tickFormat={d3.format('.3s')}/>
  <GroupedStackedBarChart
    data={data}
    xGroupScale={xGroupScale}
    xScale={xScale}
    yScale={yScale}
    colorScale={colorScale}
  />
</Chart>

```
