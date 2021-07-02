import * as React from 'react';

import { PhoneLink } from 'Components/PhoneLink/PhoneLink';

export const Dolph: React.FunctionComponent = () => (
  <>
    <h1>Привет!</h1>
    <p>Меня зовут Дольф, я не кусаюсь, но очень переживаю и скучаю по своей семье!</p>
    <p>
      Пожалуйста, позвоните им:
      {' '}
      <PhoneLink first="7 (9" fourth="0-19" second="95) 9" third="97-1" title="(Данила)" />
      {' '}
      или
      {' '}
      <PhoneLink first="7 (9" fourth="9-08" second="95) 9" third="97-0" title="(Алла)" />
    </p>
  </>
);
