import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dolph } from 'Components/Dolph';
import { Home } from 'Components/Home';
import { NotFound } from 'Components/NotFound';
import { HomeData } from 'Data/Interfaces/HomeData';

interface Props {
  homeData: HomeData;
}

export const App: React.FunctionComponent<Props> = ({ homeData }) => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Home data={homeData} />} />
      <Route path="dolph" element={<Dolph />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
