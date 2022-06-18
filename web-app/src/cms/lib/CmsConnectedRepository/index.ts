import { GitHubLibrary } from 'components/GitHubLibrary';
import { GitHubProject } from 'components/GitHubProject';
import { Home } from 'components/Home';
import { OpenSourceLibraries } from 'components/OpenSourceLibraries';
import { WorksList } from 'components/WorksList';
import { OpenSourceSection } from 'components/OpenSourceSection';
import { RichTextSection } from 'components/RichTextSection';
import { SocialPresenceItem } from 'components/SocialPresenceItem';
import { SocialPresence } from 'components/SocialPresence';

import { CmsConnectedRepository } from './CmsConnectedRepository';

const cmsConnectedRepository = new CmsConnectedRepository();

cmsConnectedRepository.registerComponent('gitHubLibrary', GitHubLibrary);
cmsConnectedRepository.registerComponent('gitHubProject', GitHubProject);
cmsConnectedRepository.registerComponent('homePage', Home);
cmsConnectedRepository.registerComponent('openSourceLibraries', OpenSourceLibraries);
cmsConnectedRepository.registerComponent('openSourceProjects', WorksList);
cmsConnectedRepository.registerComponent('openSourceSection', OpenSourceSection);
cmsConnectedRepository.registerComponent('richTextSection', RichTextSection);
cmsConnectedRepository.registerComponent('socialPresenceItem', SocialPresenceItem);
cmsConnectedRepository.registerComponent('socialPresenceSection', SocialPresence);

export { cmsConnectedRepository };
