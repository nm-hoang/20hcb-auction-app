const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#f8d12f',
              '@border-radius-base': '4px',
              '@btn-border-radius-base': '4px',
              '@card-radius': '12px',
            },
            javascriptEnabled: true,
          }
        }
      }
    }
  ]
}
