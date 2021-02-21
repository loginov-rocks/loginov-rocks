import { USERNAMES } from 'Constants';

import GitHub from './GitHub';

const instance = new GitHub({ username: USERNAMES.GITHUB });

export default instance;
