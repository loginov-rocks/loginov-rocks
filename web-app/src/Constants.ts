import Work from 'Interfaces/Work';

export const PERSONAL_WEBSITE = 'https://loginov-rocks.github.io';

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
  {
    github: true,
    name: 'UbxGps',
    platformio: 'https://platformio.org/lib/show/2014/UbxGps',
  },
  {
    github: true,
    name: 'bluetooth-terminal',
    npm: true,
  },
  {
    github: true,
    name: 'canvas-heightmap',
    npm: true,
  },
  {
    github: true,
    name: 'comments-extractor',
    npm: true,
  },
  {
    github: true,
    name: 'gulpdoc',
    npm: true,
  },
  {
    github: true,
    name: 'gulp-locales-bundler',
    npm: true,
  },
  {
    github: true,
    name: 'locales-bundler',
    npm: true,
  },
  {
    github: true,
    name: 'react-native-redux-form',
    npm: true,
  },
  {
    github: true,
    name: 'redux-repository',
    npm: true,
  },
  {
    github: true,
    name: 'three-sky',
    npm: true,
  },
  {
    archived: true,
    github: true,
    name: 'ooyala-player-component',
    npm: true,
  },
];

export const OPEN_SOURCE_PROJECTS: Work[] = [
  {
    github: true,
    homepage: `${PERSONAL_WEBSITE}/Web-Bluetooth-Terminal`,
    name: 'Web-Bluetooth-Terminal',
    npm: true,
  },
  {
    github: true,
    homepage: `${PERSONAL_WEBSITE}/Portfolio`,
    name: 'Portfolio',
  },
  {
    github: true,
    name: 'Portfolio-Firebase',
  },
  {
    github: true,
    homepage: `${PERSONAL_WEBSITE}/Firebase-Authenticator`,
    name: 'Firebase-Authenticator',
  },
  {
    github: true,
    name: 'IoT-Firebase-Authentication',
  },
  {
    github: true,
    name: 'Angular-Gulp-Boilerplate',
    npm: true,
  },
  {
    github: true,
    name: 'Arduino-Coffeemaker',
  },
  {
    github: true,
    name: 'MeArm-Controller',
  },
  {
    github: true,
    name: 'MQTT-Home-Monitor',
  },
  {
    github: true,
    name: 'NodeMCU-Arduino-PlatformIO',
  },
  {
    archived: true,
    github: true,
    name: 'Cordova-Bluetooth-Terminal',
  },
];
