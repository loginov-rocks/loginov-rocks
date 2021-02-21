import { GITHUB_PERSONAL_ACCESS_TOKEN } from 'Constants';

import { GitHub } from './GitHub';

const instance = new GitHub({ personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN });

export default instance;
