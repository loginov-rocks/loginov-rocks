import * as React from 'react';
import { useMemo, useState } from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { Time } from 'components/shared/Time';
import { LearningBlockContext } from 'contexts/LearningBlockContext';

interface Props extends CmsConnectedProps {
  items: CmsComponent[];
  title: string;
}

export const LearningBlock: React.FC<Props> = ({ items, render, title }) => {
  const [totalTimeToComplete, setTotalTimeToComplete] = useState(0);

  const contextValue = useMemo(() => ({
    addTimeToComplete: (timeToComplete: number): void => {
      setTotalTimeToComplete((prevTotalTimeToComplete) => prevTotalTimeToComplete + timeToComplete);
    },
  }), []);

  const renderedItems = render(items);

  if (!Array.isArray(renderedItems)) {
    return null;
  }

  return (
    <>
      <h3>{title}</h3>

      {totalTimeToComplete > 0 && (
        <p>
          <Time label="Total Time to Complete" minutes={totalTimeToComplete} />
        </p>
      )}

      <LearningBlockContext.Provider value={contextValue}>
        <ul>
          {renderedItems.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>{item}</li>
          ))}
        </ul>
      </LearningBlockContext.Provider>
    </>
  );
};
