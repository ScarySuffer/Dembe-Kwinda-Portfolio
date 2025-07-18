// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const rules = webpackConfig.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
      rules.forEach(rule => {
        if (rule.use && rule.use.find(u => u.loader && u.loader.includes('source-map-loader'))) {
          rule.exclude = /node_modules\/html2pdf\.js/;
        }
      });
      return webpackConfig;
    },
  },
};
