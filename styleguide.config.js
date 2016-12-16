const path = require('path');

module.exports = {
  title: 'YARD3',

  styleguideDir: 'docs',

  sections: [
    {
      name: 'Charts',
      content: 'src/components/charts/readme.md',
      components: 'src/components/charts/**/*.jsx'
    },
    {
      name: 'Accessories',
      components: 'src/components/accessories/**/*.jsx'
    }
  ],

  updateWebpackConfig(webpackConfig) {
    const dir = path.join(__dirname, 'src');

    webpackConfig.module.loaders.push(
      // Babel loader will use your project’s .babelrc
      {
        test: /\.jsx?$/,
        include: dir,
        loader: 'babel'
      },
      // Other loaders that is needed for your components
      {
        test: /\.css$/,
        include: dir,
        loader: 'style!css?modules&importLoaders=1'
      }
    );

    return webpackConfig;
  }
};
