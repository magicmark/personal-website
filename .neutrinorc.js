const node = require('@neutrinojs/node');
module.exports = {
    use: [node()],
    options: {
        source: 'functions_src',
        output: 'functions_dist',
        mains: { hello: 'hello' },
    },
};
