import React              from 'react';
import RandomBar          from '../containers/randomBar';
import Resize             from '../containers/resize';
import StreamLine         from '../containers/streamLine';
import AvgBar             from '../containers/avgBar';
import AreaChart          from '../containers/areaChart';
import Plot               from '../containers/plot';
import Pie                from '../containers/pie';
import RandomStackedBar   from '../containers/randomStackedBar';

export default () => (
  <div>
    <h1>React D3</h1>
    <Resize />
    <RandomBar />
    <StreamLine />
    <AvgBar />
    <AreaChart />
    <Plot />
    <Pie />
    <RandomStackedBar />
  </div>
);
