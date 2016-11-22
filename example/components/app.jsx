import React              from 'react';
import RandomBar          from '../containers/randomBar.jsx';
import StreamLine         from '../containers/streamLine.jsx';
import AvgBar             from '../containers/avgBar.jsx';
import AreaChart          from '../containers/areaChart.jsx';
import Plot               from '../containers/plot.jsx';
import Pie                from '../containers/pie.jsx';
import RandomStackedBar   from '../containers/randomStackedBar.jsx';

export default () => (
  <div>
    <h1>React D3</h1>
    <RandomBar />
    <StreamLine />
    <AvgBar />
    <AreaChart />
    <Plot />
    <Pie />
    <RandomStackedBar />
  </div>
);
