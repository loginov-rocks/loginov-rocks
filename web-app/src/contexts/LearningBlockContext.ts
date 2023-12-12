import { createContext, useContext } from 'react';

interface ContextValue {
  addTimeToComplete: (timeToComplete: number) => void;
}

export const LearningBlockContext = createContext<ContextValue>({
  addTimeToComplete: () => undefined,
});

export const useLearningBlockContext = (): ContextValue => useContext(LearningBlockContext);
