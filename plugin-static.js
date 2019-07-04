/**
 * Thanks to Georges Haidar
 *
 * Registers 1) a module loader rule and 2) a handy alias for file-loader both
 * of which allow importing static assets in client-side code.
 *
 * 1) Module loader rule
 * This will allow importing images assets like any other module like so:
 *
 * ```
 * import logo from "../static/logo.svg";
 * ```
 *
 * The value of logo will be a URL to the static asset
 *
 * 2) `static!` alias for file-loader
 *
 * The `static!` prefix can be used in import statements to treat a module as a
 * static asset and return a URL to it instead of bundling it and loading it
 * like a regular js/json module.
 *
 * ```
 * import honeybadger from "honeybadger-js";
 * ```
 * The effect of this line would be that webpack bundles the node module and
 * the value of honeybadger will be the default export from it.
 *
 * What if instead we wanted a reference to this module as a url that can be
 * given to a `<script />` tag? In that case we can write the following:
 *
 * ```
 * import honeybadgerSrc from "static!honeybadger-js";
 * ```
 *
 * honeybadgerSrc is now a URL that can be passed to a script's src attribute
 *
 * @param {*} nextConfig
 */
module.exports = (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
        webpack(config, options) {
            const { set } = require('lodash')

            const { isServer } = options
            const staticConfig = {
                context: '',
                emitFile: true,
                name: '[name].[hash].[ext]',
                publicPath: 'static/assets/',
                prefixPublicPathWithWebpackPublicPath: true, // this setting is provided by a PR to plugin-static - it prefixes the provided `publicPath` with `__webpack_public_path__`
                outputPath: `${isServer ? '../' : ''}static/assets/`,
            }

            set(config, 'resolveLoader.alias', {
                static: `file-loader?${JSON.stringify(staticConfig)}`,
            })

            config.module.rules.push({
                test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: staticConfig,
                    },
                ],
            })

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options)
            }

            return config
        },
    })
}
