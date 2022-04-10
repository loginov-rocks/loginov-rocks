const data = require('./data.json');

const OPEN_SOURCE_TYPE = 'OpenSource';
const SOCIAL_PRESENCE_ITEM_TYPE = 'SocialPresenceItem';

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest, createNodeId }) => {
  const { openSource } = data;

  createNode({
    ...openSource,
    id: createNodeId(OPEN_SOURCE_TYPE),
    internal: {
      contentDigest: createContentDigest(openSource),
      type: OPEN_SOURCE_TYPE,
    },
  });

  data.allSocialPresenceItem.nodes.map((socialPresenceItem) => createNode({
    ...socialPresenceItem,
    id: createNodeId(SOCIAL_PRESENCE_ITEM_TYPE + socialPresenceItem.title + socialPresenceItem.url),
    internal: {
      contentDigest: createContentDigest(socialPresenceItem),
      type: SOCIAL_PRESENCE_ITEM_TYPE,
    },
  }));
};
