module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find and modify source-map-loader rules to ignore warnings from node_modules
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.use && Array.isArray(rule.use)) {
          rule.use.forEach((use) => {
            if (use.loader && use.loader.includes("source-map-loader")) {
              // Exclude node_modules from source map loading
              if (!rule.exclude) {
                rule.exclude = [];
              }
              if (Array.isArray(rule.exclude)) {
                rule.exclude.push(/node_modules/);
              } else {
                rule.exclude = [rule.exclude, /node_modules/];
              }
            }
          });
        }
      });

      // Also suppress warnings in the webpack config
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        /Failed to parse source map/,
      ];

      return webpackConfig;
    },
  },
};

