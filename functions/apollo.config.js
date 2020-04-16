module.exports = {
    service: {
        name: 'marks-personal-graph',
        endpoint: {
            url: 'http://localhost:3000/dev/graphql', // defaults to http://localhost:4000
            skipSSLValidation: true, // optional, disables SSL validation check
        },
    },
};
