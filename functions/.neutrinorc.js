const node = require('@neutrinojs/node');
module.exports = {
    use: [node()],
    options: {
        mains: { hello: 'hello' },
    },
};
