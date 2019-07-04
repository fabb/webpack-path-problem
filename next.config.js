const namespace = process.env.NAMESPACE
const withStaticImport = require('./plugin-static')
const assetPrefix = require('./assetPrefix')

module.exports = withStaticImport({
    webpack(config, options) {
        const { isServer, dev, buildId } = options

        const originalEntry = config.entry
        config.entry = async () => {
            const entries = await originalEntry()

            // add public-path to every entrypoint to make sure __webpack_public_path__ is set correctly and before it is needed by plugin-static imports
            Object.keys(entries).forEach(k => {
                const e = entries[k]
                if (!e.includes('./public-path.js')) {
                    e.unshift('./public-path.js')
                }
            })

            return entries
        }

        return config
    },
    publicRuntimeConfig: {
        namespace: namespace,
    },
    assetPrefix: assetPrefix.assetPrefixForNamespace(namespace),
})
