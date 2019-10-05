import { USERNAMES } from 'Constants';

export const toNpm = (name: string): string => `https://www.npmjs.com/package/${name.toLowerCase()}`;

export const toGitHub = (name: string): string => `https://github.com/${USERNAMES.GITHUB}/${name}`;
