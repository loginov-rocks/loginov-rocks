import { createContext, useContext } from 'react';

interface ContextValue {
  addCompleted: (completed: string) => void;
  addProvider: (providerTitle: string) => void;
  filterProvider: string | null;
  filterYear: string | null;
}

export const LearningSectionContext = createContext<ContextValue>({
  addCompleted: () => undefined,
  addProvider: () => undefined,
  filterProvider: null,
  filterYear: null,
});

export const useLearningSectionContext = (): ContextValue => useContext(LearningSectionContext);
