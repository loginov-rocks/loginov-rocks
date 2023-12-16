import { createContext, useContext } from 'react';

interface ContextValue {
  addCompleted: (completed: string) => void;
  filterYear: string | null;
}

export const LearningSectionContext = createContext<ContextValue>({
  addCompleted: () => undefined,
  filterYear: null,
});

export const useLearningSectionContext = (): ContextValue => useContext(LearningSectionContext);
