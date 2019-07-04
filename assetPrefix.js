module.exports.assetPrefixForNamespace = namespace => {
    switch (namespace) {
        case 'prod':
            return 'https://cache.myserver.net/web'
        case 'uat':
            return 'https://cache-uat.myserver.net/web'
        case 'st':
            return 'https://cache-st.myserver.net/web'
        case 'dev':
            return 'https://cache-dev.myserver.net/web'
        default:
            return ''
    }
}
