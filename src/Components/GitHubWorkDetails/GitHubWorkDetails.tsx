import * as React from 'react';

import GitHub from 'Lib/GitHub';
import GitHubRepo from 'Lib/GitHub/GitHubRepo';
import GitHubTag from 'Lib/GitHub/GitHubTag';

interface Props {
  repo: GitHubRepo;
}

const GitHubWorkDetails: React.FunctionComponent<Props> = ({ repo }: Props) => {
  const [tags, setTags] = React.useState<GitHubTag[]>([]);

  React.useEffect(() => {
    GitHub.getTags(repo.name).then((t) => {
      setTags(t);
    });
  }, []);

  const version = tags.length > 0 ? tags[0].name : undefined;

  return (
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

      {repo.stargazers_count > 0 && (
        <>
          <span title="GitHub Stars">
            &#x2B50;
            {repo.stargazers_count}
          </span>
          {' '}
          /
          {' '}
        </>
      )}

      <span title="Last Updated">
        {new Date(repo.updated_at).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </span>

      {version && (
        <>
          {' '}
          /
          {' '}
          <span title="Last Version">{version}</span>
        </>
      )}

    </>
  );
};

export default GitHubWorkDetails;
