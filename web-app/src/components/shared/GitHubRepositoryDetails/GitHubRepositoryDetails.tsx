import { GitHubRepo } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

interface Props {
  repository: GitHubRepo;
}

export const GitHubRepositoryDetails: React.FC<Props> = ({ repository }) => (
  <>

    {repository.description && (
      <>
        {repository.description}
        <br />
      </>
    )}

    {repository.language && (
      <>
        <span title="Primary Language">{repository.language}</span>
        {' '}
        /
        {' '}
      </>
    )}

    {repository.stars > 0 && (
      <>
        <span title="GitHub Stars">
          &#x2B50;
          {' '}
          {repository.stars}
        </span>
        {' '}
        /
        {' '}
      </>
    )}

    <span title="Last Updated">
      {new Date(repository.updatedAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
        year: 'numeric',
      })}
    </span>

    {repository.latestTag && (
      <>
        {' '}
        /
        {' '}
        <span title="Latest Tag">{repository.latestTag}</span>
      </>
    )}

  </>
);
