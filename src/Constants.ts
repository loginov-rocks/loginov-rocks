import Work from 'Interfaces/Work';

export const USERNAMES = {
  FACEBOOK: '1oginov',
  GITHUB: 'loginov-rocks',
  INSTAGRAM: 'loginov_rocks',
  LINKEDIN: 'loginov-rocks',
  MEDIUM: 'loginov_rocks',
  NPM: 'loginov-rocks',
  TWITTER: 'loginov_rocks',
};

export const OPEN_SOURCE_LIBRARIES: Work[] = [
  { github: true, name: 'bluetooth-terminal', npm: true },
  { github: true, name: 'canvas-heightmap', npm: true },
  { github: true, name: 'comments-extractor', npm: true },
  { github: true, name: 'gulpdoc', npm: true },
  { github: true, name: 'gulp-locales-bundler', npm: true },
  { github: true, name: 'locales-bundler', npm: true },
  { github: true, name: 'react-native-redux-form', npm: true },
  { github: true, name: 'redux-repository', npm: true },
  { github: true, name: 'three-sky', npm: true },
  {
    archived: true, github: true, name: 'ooyala-player-component', npm: true,
  },
];

export const OPEN_SOURCE_PROJECTS: Work[] = [
  { github: true, name: 'Angular-Gulp-Boilerplate', npm: true },
  { github: true, name: 'Web-Bluetooth-Terminal', npm: true },
  { archived: true, github: true, name: 'Cordova-Bluetooth-Terminal' },
];
