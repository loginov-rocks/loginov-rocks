import * as React from 'react';
import { useMemo, useState } from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { LearningSectionContext } from 'contexts/LearningSectionContext';

import { LearningSectionFilter } from './LearningSectionFilter';

interface Props extends CmsConnectedProps {
  blocks: CmsComponent[];
  title: string;
}

export const LearningSection: React.FC<Props> = ({ blocks, render, title }) => {
  const [filterYear, setFilterYear] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);

  // Using memo to avoid unnecessary re-renderings.
  const contextValue = useMemo(() => ({
    addCompleted: (completed: string): void => {
      const year = completed.substring(0, 4);

      setYears((prevYears) => {
        if (prevYears.includes(year)) {
          return prevYears;
        }

        return [
          ...prevYears,
          year,
        ];
      });
    },
    filterYear,
  }), [filterYear]);

  const handleSelectYear = (year: string | null): void => {
    setFilterYear(year);
  };

  return (
    <>

      <h2>{title}</h2>

      <LearningSectionFilter filterYear={filterYear} onSelectYear={handleSelectYear} years={years} />

      <LearningSectionContext.Provider value={contextValue}>
        {render(blocks)}
      </LearningSectionContext.Provider>

    </>
  );
};