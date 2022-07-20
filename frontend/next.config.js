const path = require('path')

module.exports = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_API_URL,
    },    
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    trailingSlash: true,
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
      }
}