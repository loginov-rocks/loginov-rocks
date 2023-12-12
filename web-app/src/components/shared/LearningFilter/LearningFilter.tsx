import * as React from 'react';

interface Props {
  onSelectYear: (year: string | null) => void;
  selectedYear: string | null;
  years: string[];
}

export const LearningFilter: React.FC<Props> = ({ onSelectYear, selectedYear, years }) => {
  const displayedYears = years.sort().reverse();

  return (
    <>

      {displayedYears.map((year, index) => (
        <button
          disabled={year === selectedYear}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={() => onSelectYear(year)}
          type="button"
        >
          {year}
        </button>
      ))}

      {selectedYear !== null && (
        <button onClick={() => onSelectYear(null)} type="button">Clear</button>
      )}

    </>
  );
};
