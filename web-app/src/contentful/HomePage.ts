import { OpenSourceSection } from './OpenSourceSection';
import { RichTextSection } from './RichTextSection';
import { SocialPresenceSection } from './SocialPresenceSection';

type HomePageSection = OpenSourceSection | RichTextSection | SocialPresenceSection;

export interface HomePage {
  fields: {
    title: string;
    sections: HomePageSection[];
  };
  sys: {
    contentType: {
      sys: {
        id: 'homePage';
      };
    };
  };
}
