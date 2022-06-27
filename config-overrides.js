module.exports = function override(config, env) {
    config.resolve.fallback = Object.assign(config.resolve.fallback || {}, {
        os: require.resolve('os-browserify'),
        path: require.resolve('path-browserify')
    })
    return config;
}