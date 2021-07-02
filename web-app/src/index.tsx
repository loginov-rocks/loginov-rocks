import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from 'Components/App';
import * as homeData from 'Data/Home.json';

const container = document.getElementById('app');

ReactDOM.render(<App homeData={homeData} />, container);
