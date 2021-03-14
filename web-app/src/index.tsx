import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from 'Components/App';
import data from 'Data.json';

const container = document.getElementById('app');

ReactDOM.render(<App data={data} />, container);
