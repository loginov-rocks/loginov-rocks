import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { Time } from 'components/shared/Time';
import { useLearningSectionContext } from 'contexts/LearningSectionContext';

interface Props extends CmsConnectedProps {
  items: CmsComponent[];
  title: string;
}

export const LearningBlock: React.FC<Props> = ({ items, render, title }) => {
  const { filterYear } = useLearningSectionContext();

  let totalTimeToComplete = 0;

  const filteredItems = items.map((item) => {
    // Keep the item if not of the "learningItem" type.
    if (item.type !== 'learningItem') {
      return item;
    }

    // Extract the year of completion.
    const completedYear = typeof item.props.completed === 'string' ? item.props.completed.substring(0, 4) : null;

    // Avoid rendering the learning item if filtered by year, but the year of completion does not match it.
    if (filterYear !== null && completedYear !== filterYear) {
      return null;
    }

    // Add time to complete to total.
    if (typeof item.props.timeToComplete === 'number') {
      totalTimeToComplete += item.props.timeToComplete;
    }

    return item;
  })
    // Filter out null items to prevent blank renders.
    .filter((item) => item !== null) as CmsComponent[];

  const renderedItems = render(filteredItems);

  if (!Array.isArray(renderedItems) || renderedItems.length === 0) {
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

      <ul>
        {renderedItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item}</li>
        ))}
      </ul>

    </>
  );
};
