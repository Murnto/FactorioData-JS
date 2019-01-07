module.exports = {
    handleFetch: false,
    minify: true,
    navigateFallback: '/index.html',
    runtimeCaching: [
        {
            handler: 'fastest',
            urlPattern: /pack\/.*\.json/
        },
        {
            handler: 'cacheFirst',
            urlPattern: /icon\/.*/
        },
    ],
    staticFileGlobs: [
        'build/index.html',
        'build/static/css/**.css',
        'build/favicon.ico',
        'build/manifest.json'
    ],
    stripPrefix: 'build/',
    swFilePath: './build/service-worker.js'
};
