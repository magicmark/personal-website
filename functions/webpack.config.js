
const { EnvironmentPlugin } = require('webpack');
const neutrino = require('neutrino');
const webpack = neutrino().webpack();

webpack.plugins = [
    ...webpack.plugins,
    new EnvironmentPlugin(['ENGINE_API_KEY', 'NETLIFY']),
];

module.exports = webpack;