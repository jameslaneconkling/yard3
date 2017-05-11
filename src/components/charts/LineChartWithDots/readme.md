```
const d3 = require('d3');
const nyY = d => d['New York'];
const sfY = d => d['San Francisco'];
// const atY = d => d.Austin;
const x = d => d.xValue;

const data = [
  {
    xValue: 1,
    data: [
      {
        lineKey: 'a',
        lineLabel: 'A',
        value: 1
      },
      {
        lineKey: 'b',
        lineLabel: 'B',
        value: 2
      },
      {
        lineKey: 'c',
        lineLabel: 'C',
        value: 3
      }
    ]
  },
  {
    xValue: 2,
    data: [
      {
        lineKey: 'a',
        lineLabel: 'A',
        value: 2
      },
      {
        lineKey: 'b',
        lineLabel: 'B',
        value: 3
      },
      {
        lineKey: 'c',
        lineLabel: 'C',
        value: 4
      }
    ]
  },
  {
    xValue: 3,
    data: [
      {
        lineKey: 'a',
        lineLabel: 'A',
        value: 10
      },
      {
        lineKey: 'b',
        lineLabel: 'B',
        value: 7
      },
      {
        lineKey: 'c',
        lineLabel: 'C',
        value: 0
      }
    ]
  }
];

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
  .domain([1, 3]);

const yScale = d3.scaleLinear()
  .domain([0, 10]);

class Visualization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipX: null,
      tooltipY: null,
      tooltipData: [],
    };
    this.moveTooltip = this.moveTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  moveTooltip(d) {
    // this works if the tooltip is positioned relative to the page
    // meaning that none of it's parent elements are relatively positioned
    // this.setState({
    //   tooltipX: d3.event.x,
    //   tooltipY: d3.event.y
    // });

    // otherwise, pass the nearest relatively positioned element to d3.mouse()
    // to calculate the mouse position relative to that element

    const [tooltipX, tooltipY] = d3.mouse(this.$visContainer);
    this.setState({ tooltipX, tooltipY, tooltipData: d.data });
  }

  hideTooltip() {
    this.setState({
      tooltipX: null,
      tooltipY: null,
    });
  }

  render() {
    const { tooltipX, tooltipY, tooltipData } = this.state;

    return (
      <div
        ref={(el) => {
          this.$visContainer = el;
        }}
      >
        <Tooltip
          x={tooltipX}
          y={tooltipY}
          xOffset={18}
          yOffset={-12}
        >
          <div>
            {tooltipData.map(d => 
            <div> 
              <span> {d.lineLabel}: {d.value} </span>
              <br />
            </div>
            )}
          </div>
        </Tooltip>
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
            onMouseMove={this.moveTooltip}
            onMouseLeave={this.hideTooltip}
          />
        </Chart>
      </div>
    )
  }
}

<Visualization />
```
