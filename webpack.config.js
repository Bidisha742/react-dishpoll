module.exports = {
    // ...
    resolve: {
        fallback: {
          util: require.resolve("util/")
        }
    },
    node: {
        fs: 'empty'
      }
    // ...
  };