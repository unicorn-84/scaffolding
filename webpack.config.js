const path = require('path')

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    main: path.resolve('src', 'index.js')
  },
  output: {
    filename: prod ? '[name].[contenthash:4].js' : '[name].js'
  }
}
