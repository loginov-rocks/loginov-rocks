import { USERNAMES } from 'Constants';

export const toGitHub = (name: string): string => `https://github.com/${USERNAMES.GITHUB}/${name}`;

export const toNpm = (name: string): string => `https://www.npmjs.com/package/${name.toLowerCase()}`;
