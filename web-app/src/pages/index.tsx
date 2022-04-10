import * as React from 'react';

import { Home } from 'Components/Home';
import * as homeData from 'Data/Home.json';

const IndexPage = () => (
  <Home data={homeData} />
);

export default IndexPage;
