import { SocialPresenceItem } from './SocialPresenceItem';

export interface HomeData {
  openSource: {
    libraries: string[];
    projects: string[];
  };
  socialPresenceItems: SocialPresenceItem[];
}
