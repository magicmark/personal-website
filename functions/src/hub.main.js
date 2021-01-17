import createServer, { typeDefs } from './app';

// Export as a convenience 
export { typeDefs };

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
