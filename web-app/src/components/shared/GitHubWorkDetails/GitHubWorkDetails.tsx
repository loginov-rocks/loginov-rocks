import { GitHubRepo } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

interface Props {
  repo: GitHubRepo;
}

export const GitHubWorkDetails: React.FC<Props> = ({ repo }) => (
  <>

    {repo.description && (
      <>
        {repo.description}
        <br />
      </>
    )}

    {repo.language && (
      <>
        <span title="Language">{repo.language}</span>
        {' '}
        /
        {' '}
      </>
    )}

    {repo.stars > 0 && (
      <>
        <span title="GitHub Stars">
          &#x2B50;
          {repo.stars}
        </span>
        {' '}
        /
        {' '}
      </>
    )}

    <span title="Last Updated">
      {new Date(repo.updatedAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })}
    </span>

    {repo.latestTag && (
      <>
        {' '}
        /
        {' '}
        <span title="Latest Tag">{repo.latestTag}</span>
      </>
    )}

  </>
);
