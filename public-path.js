const namespace = process.env.NAMESPACE
const assetPrefix = require('./assetPrefix')

// setting __webpack_public_path__ because we need it already on SSR for the plugin-static to generate correct urls, but next.js only sets it on the client: https://github.com/zeit/next.js/blob/master/packages/next/client/index.js#L47
__webpack_public_path__ = `${assetPrefix.assetPrefixForNamespace(namespace)}/_next/`
