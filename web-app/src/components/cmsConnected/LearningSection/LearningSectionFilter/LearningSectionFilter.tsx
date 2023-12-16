import * as React from 'react';

interface Props {
  filterYear: string | null;
  onSelectYear: (year: string | null) => void;
  years: string[];
}

export const LearningSectionFilter: React.FC<Props> = ({ filterYear, onSelectYear, years }) => {
  const numericYears = years.map((year) => parseInt(year, 10));
  const minYear = Math.min(...numericYears);
  const maxYear = Math.max(...numericYears);

  for (let i = minYear; i < maxYear; i += 1) {
    if (!numericYears.includes(i)) {
      numericYears.push(i);
    }
  }

  const displayedYears = numericYears.sort().reverse().map((year) => year.toString());

  return (
    <>

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

    </>
  );
};
