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
  const [filterProvider, setFilterProvider] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState<string | null>(null);
  const [providers, setProviders] = useState<string[]>([]);
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
    addProvider: (providerTitle: string): void => {
      setProviders((prevProviders) => {
        if (prevProviders.includes(providerTitle)) {
          return prevProviders;
        }

        return [
          ...prevProviders,
          providerTitle,
        ];
      });
    },
    filterProvider,
    filterYear,
  }), [filterProvider, filterYear]);

  const handleSelectProvider = (providerTitle: string | null): void => {
    setFilterProvider(providerTitle);
  };

  const handleSelectYear = (year: string | null): void => {
    setFilterYear(year);
  };

  return (
    <>

      <h2>{title}</h2>

      <LearningSectionFilter
        filterProvider={filterProvider}
        filterYear={filterYear}
        onSelectProvider={handleSelectProvider}
        onSelectYear={handleSelectYear}
        providers={providers}
        years={years}
      />

      <LearningSectionContext.Provider value={contextValue}>
        {render(blocks)}
      </LearningSectionContext.Provider>

    </>
  );
};
