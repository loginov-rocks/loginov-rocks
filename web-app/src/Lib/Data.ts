import { SocialPresenceItem } from './SocialPresenceItem';

export interface Data {
  openSource: {
    libraries: string[];
    projects: string[];
  };
  socialPresenceItems: SocialPresenceItem[];
}
