import * as React from 'react';

const displayProviders = (providers: string[]): string[] => (
  [...providers].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
);

const displayYears = (years: string[]): string[] => {
  const numericYears = years.map((year) => parseInt(year, 10));
  const minYear = Math.min(...numericYears);
  const maxYear = Math.max(...numericYears);

  for (let i = minYear; i < maxYear; i += 1) {
    if (!numericYears.includes(i)) {
      numericYears.push(i);
    }
  }

  return numericYears.sort().reverse().map((year) => year.toString());
};

interface Props {
  filterProvider: string | null;
  filterYear: string | null;
  onSelectProvider: (providerTitle: string | null) => void;
  onSelectYear: (year: string | null) => void;
  providers: string[];
  years: string[];
}

export const LearningSectionFilter: React.FC<Props> = ({
  filterProvider, filterYear, onSelectProvider, onSelectYear, providers, years,
}) => {
  const handleSelectProvider = (event: React.FormEvent<HTMLSelectElement>): void => {
    onSelectProvider(event.currentTarget.value !== 'undefined' ? event.currentTarget.value : null);
  };

  const displayedProviders = displayProviders(providers);
  const displayedYears = displayYears(years);

  return (
    <>

      <p>
        {displayedYears.map((year, index) => (
          <button
            disabled={year === filterYear}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => onSelectYear(year)}
            type="button"
          >
            {year}
          </button>
        ))}

        {filterYear !== null && (
          <button onClick={() => onSelectYear(null)} type="button">Clear</button>
        )}
      </p>

      <p>
        <select onChange={handleSelectProvider} value={filterProvider !== null ? filterProvider : 'undefined'}>
          <option value="undefined">All providers</option>
          {displayedProviders.map((title, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <option key={index}>{title}</option>
          ))}
        </select>

        {filterProvider !== null && (
          <button onClick={() => onSelectProvider(null)} type="button">Clear</button>
        )}
      </p>

    </>
  );
};
