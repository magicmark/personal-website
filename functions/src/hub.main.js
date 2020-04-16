import createServer from './app';

function getHandler() {
    const server = createServer();
    return server.createHandler({
        cors: {
            origin: true,
            credentials: true,
        },
    });
}

export const handler = getHandler();