import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { Time } from 'components/shared/Time';
import { useLearningSectionContext } from 'contexts/LearningSectionContext';

const filterItems = (items: CmsComponent[], filterProvider: string | null, filterYear: string | null): {
  filteredItems: CmsComponent[];
  totalTimeToComplete: number;
} => {
  let totalTimeToComplete = 0;

  const filteredItems = items.map((item) => {
    // Keep the item if not of the "learningItem" type.
    if (item.type !== 'learningItem') {
      return item;
    }

    // Extract provider title.
    const providerProps = item.props.provider ? (item.props.provider as CmsComponent).props : null;
    const providerTitle = providerProps && typeof providerProps.title === 'string' ? providerProps.title : null;

    // Avoid rendering the learning item if filtered by the provider, but the provider title does not match it.
    if (filterProvider !== null && providerTitle !== filterProvider) {
      return null;
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

  return {
    filteredItems,
    totalTimeToComplete,
  };
};

interface Props extends CmsConnectedProps {
  items: CmsComponent[];
  title: string;
}

export const LearningBlock: React.FC<Props> = ({ items, render, title }) => {
  const { filterProvider, filterYear } = useLearningSectionContext();

  const { filteredItems, totalTimeToComplete } = filterItems(items, filterProvider, filterYear);
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
