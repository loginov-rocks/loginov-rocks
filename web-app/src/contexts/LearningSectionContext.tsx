import { createContext, useContext } from 'react';

interface ContextValue {
  addCompleted: (completed: string) => void;
}

export const LearningSectionContext = createContext<ContextValue>({
  addCompleted: () => undefined,
});

export const useLearningSectionContext = (): ContextValue => useContext(LearningSectionContext);
