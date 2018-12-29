const path = require('path')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack(config) {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@': path.resolve('src'),
    })
    return config
  },
})
