import { GitHubRepo } from '@loginov-rocks/loginov-rocks-shared';
import * as React from 'react';

interface Props {
  repo: GitHubRepo;
}

export const GitHubWorkDetails: React.FunctionComponent<Props> = ({ repo }: Props) => (
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

    {repo.latestVersion && (
      <>
        {' '}
        /
        {' '}
        <span title="Last Version">{repo.latestVersion}</span>
      </>
    )}

  </>
);
