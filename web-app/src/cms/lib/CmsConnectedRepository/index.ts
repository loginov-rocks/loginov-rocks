import { GitHubLibrary } from 'components/cmsConnected/GitHubLibrary';
import { GitHubProject } from 'components/cmsConnected/GitHubProject';
import { HomePage } from 'components/cmsConnected/HomePage';
import { OpenSourceLibraries } from 'components/cmsConnected/OpenSourceLibraries';
import { OpenSourceProjects } from 'components/cmsConnected/OpenSourceProjects';
import { OpenSourceSection } from 'components/cmsConnected/OpenSourceSection';
import { RichTextSection } from 'components/cmsConnected/RichTextSection';
import { SocialPresenceItem } from 'components/cmsConnected/SocialPresenceItem';
import { SocialPresenceSection } from 'components/cmsConnected/SocialPresenceSection';

import { CmsConnectedRepository } from './CmsConnectedRepository';

const cmsConnectedRepository = new CmsConnectedRepository();

cmsConnectedRepository.registerComponent('gitHubLibrary', GitHubLibrary);
cmsConnectedRepository.registerComponent('gitHubProject', GitHubProject);
cmsConnectedRepository.registerComponent('homePage', HomePage);
cmsConnectedRepository.registerComponent('openSourceLibraries', OpenSourceLibraries);
cmsConnectedRepository.registerComponent('openSourceProjects', OpenSourceProjects);
cmsConnectedRepository.registerComponent('openSourceSection', OpenSourceSection);
cmsConnectedRepository.registerComponent('richTextSection', RichTextSection);
cmsConnectedRepository.registerComponent('socialPresenceItem', SocialPresenceItem);
cmsConnectedRepository.registerComponent('socialPresenceSection', SocialPresenceSection);

export { cmsConnectedRepository };
