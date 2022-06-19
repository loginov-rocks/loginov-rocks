import { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import { createContext, useContext } from 'react';

export const GitHubContext = createContext<GitHubData | null>(null);

export const useGitHubContext = (): GitHubData | null => useContext(GitHubContext);
