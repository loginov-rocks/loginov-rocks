import { graphql } from 'gatsby';
import * as React from 'react';

import { Home } from 'Components/Home';

export const query = graphql`
    query {
        allSocialPresenceItem {
            nodes {
                title
                url
                url2
            }
        }
        openSource {
            projects
            libraries
        }
    }
`;

export default Home;
