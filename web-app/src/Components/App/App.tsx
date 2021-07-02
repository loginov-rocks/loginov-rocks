import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dolph } from 'Components/Dolph';
import { Home } from 'Components/Home';
import { NotFound } from 'Components/NotFound';
import { HomeData } from 'Data/Interfaces/HomeData';

interface Props {
  homeData: HomeData;
}

export const App: React.FunctionComponent<Props> = ({ homeData }: Props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home data={homeData} />
      </Route>
      <Route path="/:lang?/dolph">
        <Dolph />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);
