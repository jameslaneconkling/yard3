import React      from 'react';
import { render } from 'react-dom';
import App        from './components/app.jsx';
import                 './style.scss';
import * as d3    from 'd3';
import Rx         from 'rxjs';

window.d3 = d3;
window.Rx = Rx;

render(<App />, document.getElementById('app'));

export default App;
