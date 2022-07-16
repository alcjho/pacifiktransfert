const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    trailingSlash: true,
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
      }
}