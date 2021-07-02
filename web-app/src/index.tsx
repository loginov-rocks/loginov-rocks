import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Home } from 'Components/Home';
import * as homeData from 'Data/Home.json';

const container = document.getElementById('app');

ReactDOM.render(<Home data={homeData} />, container);
