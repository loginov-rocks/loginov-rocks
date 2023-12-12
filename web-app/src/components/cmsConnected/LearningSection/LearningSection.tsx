import * as React from 'react';
import { useMemo, useState } from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { LearningFilter } from 'components/shared/LearningFilter';
import { LearningSectionContext } from 'contexts/LearningSectionContext';

interface Props extends CmsConnectedProps {
  blocks: CmsComponent[];
  title: string;
}

export const LearningSection: React.FC<Props> = ({ blocks, render, title }) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);

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
  }), []);

  const handleSelectYear = (year: string | null): void => {
    setSelectedYear(year);
  };

  return (
    <>

      <h2>{title}</h2>

      <LearningFilter onSelectYear={handleSelectYear} selectedYear={selectedYear} years={years} />

      <LearningSectionContext.Provider value={contextValue}>
        {render(blocks)}
      </LearningSectionContext.Provider>

    </>
  );
};
