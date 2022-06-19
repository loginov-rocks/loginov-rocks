import * as React from 'react';

import { PhoneLink } from 'components/dumb/PhoneLink';

export const Dolph: React.FC = () => (
  <>
    <h1>Hello!</h1>
    <p>
      I am
      {' '}
      <strong>Dolph</strong>
      , I do not bite, but worry a lot and miss my family!
    </p>
    <p>
      Please call them or write on Telegram or WhatsApp:
      {' '}
      <PhoneLink first="7 (9" fourth="9-08" second="95) 9" third="97-0" title="(Alla)" />
      {' '}
      or
      {' '}
      <PhoneLink first="7 (9" fourth="0-19" second="95) 9" third="97-1" title="(Danila)" />
      !
    </p>
    <p>
      On
      {' '}
      <strong>March 24, 2022</strong>
      , I am traveling by plane with my mom
      {' '}
      <strong>Alla Loginova</strong>
      {' '}
      from Saint Petersburg (Russia) through Istanbul (Turkey) to Tbilisi (Georgia):
    </p>
    <ul>
      <li>
        Turkish Airlines
        {' '}
        <a href="https://www.flightradar24.com/data/flights/tk402" rel="noreferrer" target="_blank">TK 402</a>
        : LED (Saint Petersburg) 15:00 &mdash; IST (Istanbul) 18:55
      </li>
      <li>
        Turkish Airlines
        {' '}
        <a href="https://www.flightradar24.com/data/flights/tk386" rel="noreferrer" target="_blank">TK 386</a>
        : IST (Istanbul) 21:25 &mdash; TBS (Tbilisi) 00:35
      </li>
    </ul>
    <p>
      Microchip #
      {' '}
      <strong>643&nbsp;094&nbsp;100&nbsp;473&nbsp;529</strong>
    </p>
  </>
);