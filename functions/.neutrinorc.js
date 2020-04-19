const node = require('@neutrinojs/node');

module.exports = {
    use: [
        node({
            hot: false,
            babel: {
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }),
    ],
    options: {
        mains: { hub: 'hub.main' },
    },
};
