const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src'),
      ],
    },
  });
};
