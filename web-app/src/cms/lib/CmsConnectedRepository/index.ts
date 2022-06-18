import { GitHubLibrary } from 'components/connected/GitHubLibrary';
import { GitHubProject } from 'components/connected/GitHubProject';
import { Home } from 'components/connected/Home';
import { OpenSourceLibraries } from 'components/connected/OpenSourceLibraries';
import { OpenSourceProjects } from 'components/connected/OpenSourceProjects';
import { OpenSourceSection } from 'components/connected/OpenSourceSection';
import { RichTextSection } from 'components/connected/RichTextSection';
import { SocialPresenceItem } from 'components/connected/SocialPresenceItem';
import { SocialPresenceSection } from 'components/connected/SocialPresenceSection';

import { CmsConnectedRepository } from './CmsConnectedRepository';

const cmsConnectedRepository = new CmsConnectedRepository();

cmsConnectedRepository.registerComponent('gitHubLibrary', GitHubLibrary);
cmsConnectedRepository.registerComponent('gitHubProject', GitHubProject);
cmsConnectedRepository.registerComponent('homePage', Home);
cmsConnectedRepository.registerComponent('openSourceLibraries', OpenSourceLibraries);
cmsConnectedRepository.registerComponent('openSourceProjects', OpenSourceProjects);
cmsConnectedRepository.registerComponent('openSourceSection', OpenSourceSection);
cmsConnectedRepository.registerComponent('richTextSection', RichTextSection);
cmsConnectedRepository.registerComponent('socialPresenceItem', SocialPresenceItem);
cmsConnectedRepository.registerComponent('socialPresenceSection', SocialPresenceSection);

export { cmsConnectedRepository };
