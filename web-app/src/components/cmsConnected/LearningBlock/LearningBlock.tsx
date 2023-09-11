import * as React from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { Time } from 'components/shared/Time';

interface Props extends CmsConnectedProps {
  items: CmsComponent[];
  title: string;
}

export const LearningBlock: React.FC<Props> = ({ items, render, title }) => {
  const renderedItems = render(items);

  let effort = 0;

  items.forEach((item) => {
    if (item.type === 'learningItem' && item.props.timeToComplete) {
      effort += item.props.timeToComplete as number;
    }
  });

  if (!Array.isArray(renderedItems)) {
    return null;
  }

  return (
    <>
      <h3>{title}</h3>

      {effort > 0 && (
        <p>
          <Time label="Effort" minutes={effort} />
        </p>
      )}

      <ul>
        {renderedItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
