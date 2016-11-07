import React        from 'react';
import RandomBar    from '../containers/randomBar.jsx';
import StreamLine   from '../containers/streamLine.jsx';
import AvgBar       from '../containers/avgBar.jsx';

export default () => (
  <div>
    <h1>React D3</h1>
    <RandomBar />
    <StreamLine />
    <AvgBar />
  </div>
);
