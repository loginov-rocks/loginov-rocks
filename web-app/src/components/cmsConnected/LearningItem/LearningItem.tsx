import * as React from 'react';
import { useEffect } from 'react';

import { CmsComponent } from 'cms/interfaces/CmsComponent';
import { CmsConnectedProps } from 'cms/interfaces/CmsConnectedProps';
import { ExternalLink } from 'components/shared/ExternalLink';
import { Time } from 'components/shared/Time';
import { useLearningSectionContext } from 'contexts/LearningSectionContext';

interface Props extends CmsConnectedProps {
  completed?: string;
  credentialId?: string;
  credentialLink?: string;
  provider?: CmsComponent;
  providerLink?: string;
  timeToComplete?: number;
  title: string;
}

export const LearningItem: React.FC<Props> = ({
  completed, credentialId, credentialLink, provider, providerLink, render, timeToComplete, title,
}) => {
  const { addCompleted } = useLearningSectionContext();

  useEffect(() => {
    if (completed) {
      addCompleted(completed);
    }
  }, []);

  let renderTitle = <strong>{title}</strong>;

  if (providerLink) {
    renderTitle = (
      <ExternalLink href={providerLink} label="Link to Certification or Training">{renderTitle}</ExternalLink>
    );
  }

  let renderCredential = null;

  if (credentialId && credentialLink) {
    renderCredential = <ExternalLink href={credentialLink} label="Link to Credential">{credentialId}</ExternalLink>;
  } else if (credentialId) {
    renderCredential = credentialId;
  } else if (credentialLink) {
    renderCredential = <ExternalLink href={credentialLink} label="Link to Credential">Link</ExternalLink>;
  }

  return (
    <>

      {renderTitle}

      {provider && (
        <>
          {' '}
          /
          {' '}
          {render(provider)}
        </>
      )}

      {(completed || timeToComplete) && (
        <>
          <br />

          {completed && (
            <span title="Completed">
              {new Date(completed).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short',
                timeZone: 'UTC',
                year: 'numeric',
              })}
            </span>
          )}

          {completed && timeToComplete && (
            <>
              {' '}
              /
              {' '}
            </>
          )}

          {timeToComplete && (
            <Time label="Time to Complete" minutes={timeToComplete} />
          )}

        </>
      )}

      {renderCredential && (
        <em>
          <br />
          Credential:
          {' '}
          {renderCredential}
        </em>
      )}

    </>
  );
};

LearningItem.defaultProps = {
  completed: undefined,
  credentialId: undefined,
  credentialLink: undefined,
  provider: undefined,
  providerLink: undefined,
  timeToComplete: undefined,
};
