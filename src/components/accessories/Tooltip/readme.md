```
const d3 = require('d3');
const data = require('sample_datasets').letter_frequency;

const x = d => d.letter;
const y = d => d.frequency;
const xScale = d3.scaleBand()
  .padding(0.1)
  .domain(data.map(x));
const yScale = d3.scaleLinear()
  .domain(d3.extent(data, y));


class Visualization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipX: null,
      tooltipY: null
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
    this.setState({ tooltipX, tooltipY, tooltipFrequency: d.frequency, tooltipLetter: d.letter });
  }

  hideTooltip() {
    this.setState({
      tooltipX: null,
      tooltipY: null
    });
  }

  render() {
    const { tooltipX, tooltipY, tooltipFrequency, tooltipLetter } = this.state;

    return (
      <div
        ref={(el) => { this.$visContainer = el; }}
      >
        <Tooltip
          x={tooltipX}
          y={tooltipY}
          xOffset={18}
          yOffset={-12}
        >
          <div style={{ background: '#7692a0', padding: '2px 8px', border: '1px solid #587380', color: '#333' }}>
            <small><code>{tooltipLetter}: {tooltipFrequency}</code></small>
          </div>
        </Tooltip>

        <Chart
          width="600"
          height="300"
          xScale={xScale}
          yScale={yScale}
        >
          <XAxis />
          <YAxis />
          <BarChart
            data={data}
            x={x}
            y={y}
            fill="#607D8B"
            stroke={d3.color('#607D8B').darker(1).toString()}
            strokeWidth="0.5"
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
