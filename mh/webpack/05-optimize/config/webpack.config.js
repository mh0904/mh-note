const { merge } = require('webpack-merge')
const common = require('./webpack.common.config')
const dev = require('./webpack.dev.config')
const prod = require('./webpack.prod.config')
module.exports = (env, argv) => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return merge(common, prod)
    case 'development':
      return merge(common, dev)
    default:
      return new Error('no found')
  }
}
console.log(9999, process.env.NODE_ENV)
